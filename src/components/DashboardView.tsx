import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Building,
  AlertTriangle,
  ArrowRight,
  PieChart as PieIcon,
  ShieldCheck,
} from 'lucide-react';
import {
  BudgetVarianceRow,
  DashboardKPIs,
  MonthlySummaryRow,
  SystemParameters,
  UnitAllocationResult,
  ValidationSummary,
} from '../types';
import { formatCurrency, formatPercent } from '../utils/engine';
import { InlineDataBar } from './InlineDataBar';
import { InsightBlock } from './InsightBlock';
import { StatusBadge } from './StatusBadge';

interface DashboardViewProps {
  kpis: DashboardKPIs;
  varianceRows: BudgetVarianceRow[];
  monthlyRows: MonthlySummaryRow[];
  unitAllocations: UnitAllocationResult[];
  validation: ValidationSummary;
  parameters: SystemParameters;
  onNavigate: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  kpis,
  varianceRows,
  monthlyRows,
  unitAllocations,
  validation,
  parameters,
  onNavigate,
}) => {
  const top5Overruns = varianceRows.slice(0, 5);
  const currency = parameters.currencySymbol;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Executive Financial Cockpit
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            FY {parameters.activeYear} • Active Evaluation Period: Month {parameters.activeMonth} (
            {new Date(parameters.activeYear, parameters.activeMonth - 1).toLocaleString('default', {
              month: 'long',
            })}
            )
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-[#888888] block">
              Default Assessment
            </span>
            <span className="text-[13px] font-semibold text-[#051C2C]">
              {parameters.defaultAllocation === 'SqFt'
                ? 'Square Footage Weight'
                : parameters.defaultAllocation === 'Equal'
                ? 'Equal Division per Unit'
                : 'Custom Unit Weight'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Hero KPI Cards - Clean Minimalism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Total Spend YTD */}
        <div
          onClick={() => onNavigate('RPT_MonthlySummary')}
          className="card cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="kpi-title">Total Spend YTD</div>
              <DollarSign className="w-4 h-4 text-[#2251FF]" />
            </div>
            <div className="kpi-value">
              {formatCurrency(kpis.totalSpendYTD, currency, 0)}
            </div>
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <span>Through Month {parameters.activeMonth}</span>
            <span className="text-[#051C2C] font-semibold group-hover:text-[#2251FF] flex items-center gap-0.5 transition-colors">
              Explore <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* KPI 2: Budget Burn Rate */}
        <div
          onClick={() => onNavigate('RPT_BudgetVariance')}
          className="card cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="kpi-title">Budget Burn Rate</div>
              <TrendingUp className="w-4 h-4 text-[#2251FF]" />
            </div>
            <div className="kpi-value">
              {formatPercent(kpis.budgetBurnRate, 1)}
            </div>
          </div>
          <div className="mt-2">
            <InlineDataBar
              value={kpis.budgetBurnRate}
              maxValue={1.2}
              color={kpis.budgetBurnRate > 1.05 ? 'var(--color-negative)' : 'var(--color-accent)'}
            />
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <span>of {formatCurrency(kpis.totalApprovedBudgetYTD, currency, 0)}</span>
            <span className="text-[#051C2C] font-semibold group-hover:text-[#2251FF] flex items-center gap-0.5 transition-colors">
              Variances <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* KPI 3: Cost Per Unit MTD */}
        <div
          onClick={() => onNavigate('ENG_Allocation')}
          className="card cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="kpi-title">Cost Per Unit MTD</div>
              <Building className="w-4 h-4 text-[#2251FF]" />
            </div>
            <div className="kpi-value">
              {formatCurrency(kpis.costPerUnitMTD, currency, 0)}
            </div>
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <span>{kpis.totalUnits} Units • {formatCurrency(kpis.activeMonthPool, currency, 0)} pool</span>
            <span className="text-[#051C2C] font-semibold group-hover:text-[#2251FF] flex items-center gap-0.5 transition-colors">
              Schedule <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* KPI 4: Top Overrun Category */}
        <div
          onClick={() => onNavigate('RPT_BudgetVariance')}
          className="card cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="kpi-title">Top Overrun Item</div>
              <AlertTriangle
                className={`w-4 h-4 ${
                  kpis.topOverrunAmount > 0 ? 'text-[#D32F2F]' : 'text-gray-400'
                }`}
              />
            </div>
            <div className="kpi-value text-[24px] truncate" title={kpis.topOverrunCategory}>
              {top5Overruns[0]?.subcategory || 'Within Budget'}
            </div>
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <span>
              {top5Overruns[0]?.variance > 0
                ? `Over by ${formatCurrency(top5Overruns[0].variance, currency, 0)}`
                : 'All accounts balanced'}
            </span>
            <span className="text-[#051C2C] font-semibold group-hover:text-[#2251FF] flex items-center gap-0.5 transition-colors">
              Audit <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Strategic Insight Block */}
      <InsightBlock
        title="Executive Summary & Recommended Board Action"
        actionText="Review Top 5 Variances"
        onAction={() => onNavigate('RPT_BudgetVariance')}
      >
        Cumulative YTD spending has reached{' '}
        <span className="font-semibold text-[#051C2C]">
          {formatCurrency(kpis.totalSpendYTD, currency, 2)}
        </span>{' '}
        against a cumulative target of{' '}
        <span className="font-semibold text-[#051C2C]">
          {formatCurrency(kpis.totalApprovedBudgetYTD, currency, 2)}
        </span>{' '}
        (burn rate of {formatPercent(kpis.budgetBurnRate, 1)}). The primary cost pressure originates
        from{' '}
        <span className="font-medium text-[#051C2C]">
          {top5Overruns[0]?.subcategory || 'utilities'}
        </span>
        , exceeding baseline projections by{' '}
        <span className="font-semibold text-[#D32F2F]">
          {formatCurrency(kpis.topOverrunAmount, currency, 0)}
        </span>
        . The current assessment pool for Month {parameters.activeMonth} is{' '}
        <span className="font-semibold text-[#051C2C]">
          {formatCurrency(kpis.activeMonthPool, currency, 2)}
        </span>
        , distributing an average of {formatCurrency(kpis.costPerUnitMTD, currency, 2)} across all{' '}
        {kpis.totalUnits} registered units.
      </InsightBlock>

      {/* Main Grid: Top 5 Overruns & Category Allocation Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Top 5 Overruns Table */}
        <div className="lg:col-span-7 bg-white rounded-[14px] p-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
            <div>
              <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
                Top Budget Variances (YTD)
              </h2>
              <p className="text-[12px] text-[#888888]">
                Prioritized by absolute dollar variance against approved allocation
              </p>
            </div>
            <button
              onClick={() => onNavigate('RPT_BudgetVariance')}
              className="text-[12px] font-medium text-[#2251FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Full Table <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="table-th p-2.5 rounded-l-[6px]">Cost Subcategory</th>
                  <th className="table-th p-2.5 text-right">Budget YTD</th>
                  <th className="table-th p-2.5 text-right">Actual YTD</th>
                  <th className="table-th p-2.5 text-right">Variance $</th>
                  <th className="table-th p-2.5 text-right rounded-r-[6px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
                {top5Overruns.map((row, idx) => {
                  const isSevere = row.alertLevel === 'Severe Overrun';
                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#F5F5F2] transition-colors ${
                        isSevere ? 'anomaly-row' : ''
                      }`}
                    >
                      <td className="p-2.5">
                        <div className="font-medium text-[#051C2C]">{row.subcategory}</div>
                        <div className="text-[11px] text-[#888888]">{row.category}</div>
                      </td>
                      <td className="p-2.5 text-right text-gray-600 tabular-nums">
                        {formatCurrency(row.budgetYTD, currency, 0)}
                      </td>
                      <td className="p-2.5 text-right font-medium text-[#051C2C] tabular-nums">
                        {formatCurrency(row.actualYTD, currency, 0)}
                      </td>
                      <td className="p-2.5 text-right tabular-nums">
                        <span
                          className={`font-semibold ${
                            row.variance > 0 ? 'text-[#D32F2F]' : 'text-gray-600'
                          }`}
                        >
                          {row.variance > 0 ? '+' : ''}
                          {formatCurrency(row.variance, currency, 0)}
                        </span>
                        <div className="text-[10px] text-[#888888]">
                          {formatPercent(row.variancePct, 1, true)}
                        </div>
                      </td>
                      <td className="p-2.5 text-right">
                        <StatusBadge
                          label={row.alertLevel}
                          variant={
                            row.alertLevel === 'Severe Overrun'
                              ? 'negative'
                              : row.alertLevel === 'Moderate'
                              ? 'neutral'
                              : 'positive'
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Category Distribution & Quality Health */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category Spending Share Card */}
          <div className="bg-white rounded-[14px] p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-[#2251FF]" />
                <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
                  Spend Distribution (YTD)
                </h2>
              </div>
              <button
                onClick={() => onNavigate('RPT_MonthlySummary')}
                className="text-[12px] font-medium text-[#2251FF] hover:underline cursor-pointer"
              >
                Details
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {monthlyRows.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-medium text-[#051C2C]">{cat.category}</span>
                    <span className="tabular-nums font-semibold text-[#051C2C]">
                      {formatCurrency(cat.actualYTD, currency, 0)} ({formatPercent(cat.pctTotal, 1)})
                    </span>
                  </div>
                  <InlineDataBar value={cat.pctTotal} maxValue={0.5} />
                </div>
              ))}
            </div>
          </div>

          {/* Validation & Audit Summary Widget */}
          <div className="bg-white rounded-[14px] p-5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className={`w-5 h-5 ${
                    validation.totalIssues === 0 ? 'text-[#00C853]' : 'text-[#D32F2F]'
                  }`}
                />
                <div>
                  <h3 className="font-semibold text-[14px] text-[#051C2C]">
                    Data Quality Firewall
                  </h3>
                  <p className="text-[11px] text-[#888888]">
                    {validation.totalIssues === 0
                      ? 'All ledger records passed automated audit checks'
                      : `${validation.totalIssues} anomaly item(s) require review`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('SYS_Validation')}
                className="px-3 py-1 text-[11px] font-medium text-[#2251FF] border border-[#2251FF] rounded-[6px] hover:bg-[#2251FF] hover:text-white transition-colors cursor-pointer"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Unit Assessment Matrix Preview */}
      <div className="bg-white rounded-[14px] p-6 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Current Month Unit Assessment Schedule
            </h2>
            <p className="text-[12px] text-[#888888]">
              Active Month {parameters.activeMonth} • Base Method: {parameters.defaultAllocation} •
              Total Pool: {formatCurrency(kpis.activeMonthPool, currency, 2)}
            </p>
          </div>
          <button
            onClick={() => onNavigate('ENG_Allocation')}
            className="text-[12px] font-medium text-[#2251FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Full Allocation Matrix <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
          {unitAllocations.map((unit) => (
            <div
              key={unit.unitId}
              onClick={() => onNavigate('ENG_Allocation')}
              className="interactive-cell p-3 rounded-[10px] bg-[#F5F5F2] border border-[#E8E8E6] cursor-pointer"
            >
              <div className="text-[11px] font-semibold text-[#051C2C] truncate">
                {unit.unitId}
              </div>
              <div className="text-[10px] text-[#888888] truncate">{unit.ownerName}</div>
              <div className="mt-2 text-[14px] font-bold text-[#051C2C] tabular-nums">
                {formatCurrency(unit.finalAssessment, currency, 2)}
              </div>
              <div className="text-[10px] text-[#888888] mt-0.5">
                {unit.sqft} sqft • {formatPercent(unit.sqftWeight, 2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
