import {
  BudgetRow,
  BudgetVarianceRow,
  CleansedTransaction,
  CostMappingRule,
  DashboardKPIs,
  MonthlySummaryRow,
  OwnerUnit,
  SystemParameters,
  Transaction,
  UnitAllocationResult,
  ValidationSummary,
  AnomalyItem,
} from '../types';

/**
 * Cleanses raw transactions by standardizing dates, extracting year/month,
 * and performing keyword text matching against the cost mapping dictionary.
 */
export function cleanseTransactions(
  transactions: Transaction[],
  costMapping: CostMappingRule[],
  parameters: SystemParameters
): CleansedTransaction[] {
  // Sort chronologically by date
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));

  return sorted.map((trx, index) => {
    const seq = `TRX-${String(index + 1).padStart(4, '0')}`;
    const dateObj = new Date(trx.date);
    const isValidDate = !isNaN(dateObj.getTime());
    const year = isValidDate ? dateObj.getFullYear() : parameters.activeYear;
    const month = isValidDate ? dateObj.getMonth() + 1 : parameters.activeMonth;

    const descLower = (trx.rawDescription || '').toLowerCase();
    const payeeLower = (trx.payee || '').toLowerCase();

    // Match against mapping rules
    let matchedRule: CostMappingRule | undefined;
    for (const rule of costMapping) {
      if (!rule.keyword) continue;
      const kw = rule.keyword.trim().toLowerCase();
      if (kw && (descLower.includes(kw) || payeeLower.includes(kw))) {
        matchedRule = rule;
        break;
      }
    }

    if (matchedRule) {
      return {
        id: trx.id,
        seq,
        stdDate: trx.date,
        year,
        month,
        reference: trx.reference,
        payee: trx.payee,
        description: trx.rawDescription,
        amount: Number(trx.amount) || 0,
        matchedCategory: matchedRule.category,
        matchedSubcategory: matchedRule.subcategory,
        method: matchedRule.allocationType || parameters.defaultAllocation,
        status: 'Matched',
        ruleId: matchedRule.id,
      };
    } else {
      return {
        id: trx.id,
        seq,
        stdDate: trx.date,
        year,
        month,
        reference: trx.reference,
        payee: trx.payee,
        description: trx.rawDescription,
        amount: Number(trx.amount) || 0,
        matchedCategory: '待分类(Unmapped)',
        matchedSubcategory: 'Unassigned Detail',
        method: parameters.defaultAllocation,
        status: 'Unmatched',
      };
    }
  });
}

/**
 * Runs quality validation firewall: detects duplicates within day tolerance,
 * unmapped rules, and negative/refund line items.
 */
export function runDataValidation(
  cleansed: CleansedTransaction[],
  parameters: SystemParameters
): ValidationSummary {
  const dupToleranceMs = parameters.duplicateDays * 24 * 60 * 60 * 1000;

  const anomalyRows: AnomalyItem[] = [];
  let dupCount = 0;
  let unmappedCount = 0;
  let negativeCount = 0;

  cleansed.forEach((item, i) => {
    const itemDate = new Date(item.stdDate).getTime();
    const isUnmapped = item.matchedCategory === '待分类(Unmapped)';
    const isNegative = item.amount < 0;

    // Check duplicate: same payee, same amount, within tolerance window
    let isDuplicate = false;
    for (let j = 0; j < cleansed.length; j++) {
      if (i === j) continue;
      const other = cleansed[j];
      if (
        other.payee.trim().toLowerCase() === item.payee.trim().toLowerCase() &&
        Math.abs(other.amount - item.amount) < 0.01
      ) {
        const otherDate = new Date(other.stdDate).getTime();
        if (Math.abs(itemDate - otherDate) <= dupToleranceMs) {
          isDuplicate = true;
          break;
        }
      }
    }

    if (isDuplicate) dupCount++;
    if (isUnmapped) unmappedCount++;
    if (isNegative) negativeCount++;

    if (isDuplicate || isUnmapped || isNegative) {
      const issues: string[] = [];
      if (isDuplicate) issues.push(`Duplicate payment risk within ${parameters.duplicateDays} days`);
      if (isUnmapped) issues.push('Missing category rule in dictionary');
      if (isNegative) issues.push('Negative amount / refund credit');

      anomalyRows.push({
        id: item.id,
        trxId: item.seq,
        date: item.stdDate,
        payee: item.payee,
        amount: item.amount,
        isDuplicate,
        isUnmapped,
        isNegative,
        diagnosis: issues.join('; '),
      });
    }
  });

  const totalIssues = anomalyRows.length;
  const systemHealth = totalIssues === 0 ? 'Healthy' : 'At Risk';

  return {
    dupCount,
    unmappedCount,
    negativeCount,
    totalIssues,
    systemHealth,
    anomalyRows,
  };
}

/**
 * Calculates owner unit expense allocations for the active month's total pool
 * across SqFt share, equal share, and the selected active method.
 */
export function calculateAllocations(
  cleansed: CleansedTransaction[],
  owners: OwnerUnit[],
  parameters: SystemParameters
): {
  totalPool: number;
  totalUnits: number;
  totalSqFt: number;
  unitResults: UnitAllocationResult[];
} {
  // Pool = sum of transactions in active year & active month
  const activeTransactions = cleansed.filter(
    (t) => t.year === parameters.activeYear && t.month === parameters.activeMonth
  );
  const totalPool = activeTransactions.reduce((sum, t) => sum + t.amount, 0);

  const totalUnits = owners.length;
  const totalSqFt = owners.reduce((sum, u) => sum + (Number(u.sqft) || 0), 0);

  const unitResults: UnitAllocationResult[] = owners.map((unit) => {
    const sqft = Number(unit.sqft) || 0;
    const sqftWeight = totalSqFt > 0 ? sqft / totalSqFt : 0;
    const equalWeight = totalUnits > 0 ? 1 / totalUnits : 0;

    const shareSqFt = Math.round(totalPool * sqftWeight * 100) / 100;
    const shareEqual = Math.round(totalPool * equalWeight * 100) / 100;

    let finalAssessment = shareSqFt;
    if (parameters.defaultAllocation === 'Equal') {
      finalAssessment = shareEqual;
    } else if (parameters.defaultAllocation === 'Weight') {
      const w = Number(unit.customWeight) || 1.0;
      finalAssessment = Math.round(shareSqFt * w * 100) / 100;
    }

    return {
      unitId: unit.unitId,
      ownerName: unit.ownerName,
      building: unit.building,
      sqft,
      sqftWeight,
      equalWeight,
      customWeight: Number(unit.customWeight) || 1.0,
      shareSqFt,
      shareEqual,
      activeMethod: parameters.defaultAllocation,
      finalAssessment,
    };
  });

  return {
    totalPool,
    totalUnits,
    totalSqFt,
    unitResults,
  };
}

/**
 * Aggregates actual spending across all 12 calendar months for the active year by category.
 */
export function calculateMonthlySummary(
  cleansed: CleansedTransaction[],
  costMapping: CostMappingRule[],
  parameters: SystemParameters
): {
  rows: MonthlySummaryRow[];
  totalMonths: number[];
  grandTotalYTD: number;
  grandTotalMTD: number;
} {
  // Get distinct categories
  const categorySet = new Set<string>();
  costMapping.forEach((r) => categorySet.add(r.category));
  cleansed.forEach((t) => categorySet.add(t.matchedCategory));

  const categories = Array.from(categorySet).sort();

  const totalMonths = Array(12).fill(0);
  let grandTotalYTD = 0;
  let grandTotalMTD = 0;

  const rows: MonthlySummaryRow[] = categories.map((cat) => {
    const months = Array(12).fill(0);

    cleansed.forEach((t) => {
      if (t.year === parameters.activeYear && t.matchedCategory === cat) {
        const mIdx = t.month - 1;
        if (mIdx >= 0 && mIdx < 12) {
          months[mIdx] += t.amount;
        }
      }
    });

    const actualYTD = months.reduce((acc, val) => acc + val, 0);
    const actualMTD = months[parameters.activeMonth - 1] || 0;

    for (let i = 0; i < 12; i++) {
      totalMonths[i] += months[i];
    }
    grandTotalYTD += actualYTD;
    grandTotalMTD += actualMTD;

    return {
      category: cat,
      months,
      actualYTD,
      actualMTD,
      pctTotal: 0, // calculated below
    };
  });

  // Calculate percentage of total
  rows.forEach((r) => {
    r.pctTotal = grandTotalYTD > 0 ? r.actualYTD / grandTotalYTD : 0;
  });

  return {
    rows,
    totalMonths,
    grandTotalYTD,
    grandTotalMTD,
  };
}

/**
 * Computes Budget vs Actual Variance up to the current active month,
 * sorted descending by variance amount (highest overrun at top).
 */
export function calculateBudgetVariance(
  budget: BudgetRow[],
  cleansed: CleansedTransaction[],
  parameters: SystemParameters
): {
  rows: BudgetVarianceRow[];
  totalBudgetYTD: number;
  totalActualYTD: number;
  totalVariance: number;
  overallBurnRate: number;
} {
  let totalBudgetYTD = 0;
  let totalActualYTD = 0;

  const rows: BudgetVarianceRow[] = budget.map((bgt) => {
    // Sum budget from Month 1 up to Active Month
    const budgetYTD = (bgt.months || [])
      .slice(0, parameters.activeMonth)
      .reduce((sum, val) => sum + (Number(val) || 0), 0);

    // Sum actual spend in active year up to Active Month matching this subcategory
    const actualYTD = cleansed
      .filter(
        (t) =>
          t.year === parameters.activeYear &&
          t.month <= parameters.activeMonth &&
          t.matchedSubcategory.toLowerCase() === bgt.subcategory.toLowerCase()
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const variance = actualYTD - budgetYTD;
    const variancePct = budgetYTD > 0 ? variance / budgetYTD : actualYTD > 0 ? 1 : 0;
    const burnRate = budgetYTD > 0 ? actualYTD / budgetYTD : 0;

    let alertLevel: 'Severe Overrun' | 'Moderate' | 'Surplus' = 'Surplus';
    if (variancePct > parameters.varianceThreshold) {
      alertLevel = 'Severe Overrun';
    } else if (variancePct > 0) {
      alertLevel = 'Moderate';
    }

    totalBudgetYTD += budgetYTD;
    totalActualYTD += actualYTD;

    return {
      category: bgt.category,
      subcategory: bgt.subcategory,
      budgetYTD,
      actualYTD,
      variance,
      variancePct,
      burnRate,
      alertLevel,
    };
  });

  // Sort descending by variance (highest overrun at top)
  rows.sort((a, b) => b.variance - a.variance);

  const totalVariance = totalActualYTD - totalBudgetYTD;
  const overallBurnRate = totalBudgetYTD > 0 ? totalActualYTD / totalBudgetYTD : 0;

  return {
    rows,
    totalBudgetYTD,
    totalActualYTD,
    totalVariance,
    overallBurnRate,
  };
}

/**
 * Calculates high-level executive dashboard indicators.
 */
export function calculateDashboardKPIs(
  varianceResults: { rows: BudgetVarianceRow[]; totalActualYTD: number; totalBudgetYTD: number; overallBurnRate: number },
  allocationResults: { totalPool: number; totalUnits: number; totalSqFt: number },
  parameters: SystemParameters
): DashboardKPIs {
  const topOverrun = varianceResults.rows[0];
  const topOverrunCategory = topOverrun && topOverrun.variance > 0
    ? `${topOverrun.subcategory} (+${parameters.currencySymbol}${Math.round(topOverrun.variance).toLocaleString()})`
    : 'None (Within Budget)';
  const topOverrunAmount = topOverrun && topOverrun.variance > 0 ? topOverrun.variance : 0;

  const costPerUnitMTD =
    allocationResults.totalUnits > 0
      ? allocationResults.totalPool / allocationResults.totalUnits
      : 0;

  return {
    totalSpendYTD: varianceResults.totalActualYTD,
    budgetBurnRate: varianceResults.overallBurnRate,
    costPerUnitMTD,
    topOverrunCategory,
    topOverrunAmount,
    activeMonthPool: allocationResults.totalPool,
    totalApprovedBudgetYTD: varianceResults.totalBudgetYTD,
    totalUnits: allocationResults.totalUnits,
    totalSqFt: allocationResults.totalSqFt,
  };
}

/**
 * Currency and percentage formatting helpers.
 */
export function formatCurrency(value: number, symbol = '$', decimals = 2): string {
  const formatted = Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  if (value < 0) {
    return `-${symbol}${formatted}`;
  }
  return `${symbol}${formatted}`;
}

export function formatPercent(value: number, decimals = 1, showSign = false): string {
  const p = value * 100;
  const sign = showSign && p > 0 ? '+' : '';
  return `${sign}${p.toFixed(decimals)}%`;
}
