import React, { useState } from 'react';
import { Scale, Download, AlertTriangle, ArrowUpDown, Filter } from 'lucide-react';
import { BudgetVarianceRow, SystemParameters } from '../types';
import { formatCurrency, formatPercent } from '../utils/engine';
import { InlineDataBar } from './InlineDataBar';
import { InsightBlock } from './InsightBlock';
import { StatusBadge } from './StatusBadge';

interface BudgetVarianceViewProps {
  varianceData: {
    rows: BudgetVarianceRow[];
    totalBudgetYTD: number;
    totalActualYTD: number;
    totalVariance: number;
    overallBurnRate: number;
  };
  parameters: SystemParameters;
}

export const BudgetVarianceView: React.FC<BudgetVarianceViewProps> = ({
  varianceData,
  parameters,
}) => {
  const [filterAlert, setFilterAlert] = useState<string>('all');
  const currency = parameters.currencySymbol;
  const { rows, totalBudgetYTD, totalActualYTD, totalVariance, overallBurnRate } = varianceData;

  const filteredRows = rows.filter((r) => {
    if (filterAlert === 'all') return true;
    return r.alertLevel === filterAlert;
  });

  const severeCount = rows.filter((r) => r.alertLevel === 'Severe Overrun').length;
  const moderateCount = rows.filter((r) => r.alertLevel === 'Moderate').length;
  const surplusCount = rows.filter((r) => r.alertLevel === 'Surplus').length;

  const handleExportCsv = () => {
    const headers = [
      'Category',
      'Subcategory',
      'Budget YTD',
      'Actual YTD',
      'Variance Amount',
      'Variance %',
      'Burn Rate',
      'Alert Status',
    ];

    const data = rows.map((r) => [
      `"${r.category}"`,
      `"${r.subcategory}"`,
      r.budgetYTD.toFixed(2),
      r.actualYTD.toFixed(2),
      r.variance.toFixed(2),
      (r.variancePct * 100).toFixed(2) + '%',
      (r.burnRate * 100).toFixed(2) + '%',
      r.alertLevel,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...data.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `HOA_Budget_Variance_Analysis_Month_${parameters.activeMonth}_${parameters.activeYear}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
            Sheet Code: RPT_BudgetVariance
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Budget Variance & Cost Execution Engine
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Phased analysis comparing YTD approved budgets against actual expenditures through Month{' '}
            {parameters.activeMonth}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-[6px] hover:bg-[#F5F5F2] transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Variance CSV</span>
          </button>
        </div>
      </div>

      <InsightBlock title="Zero False-Positive Phasing Logic">
        Unlike naive annualized comparisons, this report aggregates the approved budget strictly for
        Months 1 through {parameters.activeMonth} of {parameters.activeYear}. Rows are ranked
        descending by dollar overrun ($Variance = Actual - Budget$). Any item exceeding the Board&apos;s{' '}
        <strong>{formatPercent(parameters.varianceThreshold, 0)}</strong> variance threshold is
        flagged with an actionable red alert.
      </InsightBlock>

      {/* Variance KPI Cards - Clean Minimalism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Budget YTD */}
        <div className="card">
          <div className="kpi-title">Approved Budget (YTD)</div>
          <div className="kpi-value text-[#051C2C]">
            {formatCurrency(totalBudgetYTD, currency, 0)}
          </div>
          <span className="text-[11px] text-[#888888] mt-2 block border-t border-gray-100 pt-2">
            Through Month {parameters.activeMonth}
          </span>
        </div>

        {/* Total Actual YTD */}
        <div className="card">
          <div className="kpi-title">Actual Expenditures (YTD)</div>
          <div className="kpi-value text-[#051C2C]">
            {formatCurrency(totalActualYTD, currency, 0)}
          </div>
          <span className="text-[11px] text-[#888888] mt-2 block border-t border-gray-100 pt-2">
            From cleansed operational ledger
          </span>
        </div>

        {/* Net Variance */}
        <div className="card">
          <div className="kpi-title">Net Dollar Variance (YTD)</div>
          <div
            className={`kpi-value ${
              totalVariance > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}
          >
            {totalVariance > 0 ? '+' : ''}
            {formatCurrency(totalVariance, currency, 0)}
          </div>
          <span className="text-[11px] text-[#888888] mt-2 block border-t border-gray-100 pt-2">
            {totalVariance > 0 ? 'Net Community Overrun' : 'Net Community Surplus'}
          </span>
        </div>

        {/* Overall Burn Rate */}
        <div className="card">
          <div className="kpi-title">Budget Burn Rate</div>
          <div className="kpi-value">
            {formatPercent(overallBurnRate, 1)}
          </div>
          <div className="mt-2">
            <InlineDataBar
              value={overallBurnRate}
              maxValue={1.2}
              color={overallBurnRate > 1.05 ? 'var(--color-negative)' : 'var(--color-accent)'}
            />
          </div>
        </div>
      </div>

      {/* Variance Matrix Table Container */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E8E6] gap-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Ranked Variance Schedule ({filteredRows.length} Items)
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-[#F5F5F2] p-0.5 rounded-[6px] text-[11px] font-medium">
            <button
              onClick={() => setFilterAlert('all')}
              className={`px-3 py-1 rounded-[4px] cursor-pointer transition-colors ${
                filterAlert === 'all'
                  ? 'bg-white shadow-xs text-[#051C2C] font-semibold'
                  : 'text-[#888888]'
              }`}
            >
              All Items ({rows.length})
            </button>
            <button
              onClick={() => setFilterAlert('Severe Overrun')}
              className={`px-3 py-1 rounded-[4px] cursor-pointer transition-colors ${
                filterAlert === 'Severe Overrun'
                  ? 'bg-white shadow-xs text-[#D32F2F] font-semibold'
                  : 'text-[#888888]'
              }`}
            >
              Severe Overrun ({severeCount})
            </button>
            <button
              onClick={() => setFilterAlert('Moderate')}
              className={`px-3 py-1 rounded-[4px] cursor-pointer transition-colors ${
                filterAlert === 'Moderate'
                  ? 'bg-white shadow-xs text-[#051C2C] font-semibold'
                  : 'text-[#888888]'
              }`}
            >
              Moderate ({moderateCount})
            </button>
            <button
              onClick={() => setFilterAlert('Surplus')}
              className={`px-3 py-1 rounded-[4px] cursor-pointer transition-colors ${
                filterAlert === 'Surplus'
                  ? 'bg-white shadow-xs text-[#00C853] font-semibold'
                  : 'text-[#888888]'
              }`}
            >
              Surplus ({surplusCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-th p-2.5 w-12 text-center rounded-l-[6px]">Rank</th>
                <th className="table-th p-2.5 w-48">Cost Subcategory</th>
                <th className="table-th p-2.5 w-40">Primary Category</th>
                <th className="table-th p-2.5 text-right w-28">Budget YTD</th>
                <th className="table-th p-2.5 text-right w-28">Actual YTD</th>
                <th className="table-th p-2.5 text-right w-32">Variance $</th>
                <th className="table-th p-2.5 text-right w-24">Variance %</th>
                <th className="table-th p-2.5 w-36">Burn Rate</th>
                <th className="table-th p-2.5 text-center w-36 rounded-r-[6px]">Alert Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filteredRows.map((row, idx) => {
                const isSevere = row.alertLevel === 'Severe Overrun';
                return (
                  <tr
                    key={row.subcategory}
                    className={`hover:bg-[#F5F5F2] transition-colors ${
                      isSevere ? 'anomaly-row' : ''
                    }`}
                  >
                    <td className="p-2.5 text-center font-mono text-[11px] text-gray-400">
                      {idx + 1}
                    </td>
                    <td className="p-2.5 font-semibold text-[#051C2C]">{row.subcategory}</td>
                    <td className="p-2.5 text-gray-600 text-[12px]">{row.category}</td>
                    <td className="p-2.5 text-right font-mono text-gray-700 tabular-nums">
                      {formatCurrency(row.budgetYTD, currency, 0)}
                    </td>
                    <td className="p-2.5 text-right font-mono font-medium text-[#051C2C] tabular-nums">
                      {formatCurrency(row.actualYTD, currency, 0)}
                    </td>
                    <td className="p-2.5 text-right font-mono font-bold tabular-nums">
                      <span className={row.variance > 0 ? 'text-[#D32F2F]' : 'text-gray-700'}>
                        {row.variance > 0 ? '+' : ''}
                        {formatCurrency(row.variance, currency, 0)}
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-mono text-gray-700 tabular-nums">
                      <span className={row.variance > 0 ? 'text-[#D32F2F] font-semibold' : ''}>
                        {formatPercent(row.variancePct, 1, true)}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-mono text-gray-700 text-right">
                          {formatPercent(row.burnRate, 1)}
                        </div>
                        <InlineDataBar
                          value={row.burnRate}
                          maxValue={1.5}
                          color={isSevere ? 'var(--color-negative)' : 'var(--color-accent)'}
                        />
                      </div>
                    </td>
                    <td className="p-2.5 text-center">
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
            {/* Summary Totals */}
            <tfoot>
              <tr className="bg-[#F5F5F2] font-bold text-[#051C2C] border-t-2 border-[#E8E8E6] text-[13px]">
                <td colSpan={3} className="p-3 uppercase text-[11px] tracking-wider">
                  Total Community Variance Portfolio
                </td>
                <td className="p-3 text-right font-mono tabular-nums">
                  {formatCurrency(totalBudgetYTD, currency, 0)}
                </td>
                <td className="p-3 text-right font-mono tabular-nums">
                  {formatCurrency(totalActualYTD, currency, 0)}
                </td>
                <td className="p-3 text-right font-mono tabular-nums">
                  <span className={totalVariance > 0 ? 'text-[#D32F2F]' : 'text-gray-700'}>
                    {totalVariance > 0 ? '+' : ''}
                    {formatCurrency(totalVariance, currency, 0)}
                  </span>
                </td>
                <td className="p-3 text-right font-mono tabular-nums">
                  {totalBudgetYTD > 0 ? formatPercent(totalVariance / totalBudgetYTD, 1, true) : '0%'}
                </td>
                <td className="p-3 text-right font-mono tabular-nums">
                  {formatPercent(overallBurnRate, 1)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
