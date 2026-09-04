import React from 'react';
import { CalendarDays, Download } from 'lucide-react';
import { MonthlySummaryRow, SystemParameters } from '../types';
import { formatCurrency, formatPercent } from '../utils/engine';
import { InlineDataBar } from './InlineDataBar';
import { InsightBlock } from './InsightBlock';

interface MonthlySummaryViewProps {
  summary: {
    rows: MonthlySummaryRow[];
    totalMonths: number[];
    grandTotalYTD: number;
    grandTotalMTD: number;
  };
  parameters: SystemParameters;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MonthlySummaryView: React.FC<MonthlySummaryViewProps> = ({
  summary,
  parameters,
}) => {
  const currency = parameters.currencySymbol;
  const { rows, totalMonths, grandTotalYTD, grandTotalMTD } = summary;

  const handleExportCsv = () => {
    const headers = ['Category', ...MONTH_NAMES, 'YTD Total', 'MTD Actual', '% of Total'];
    const data = rows.map((r) => [
      `"${r.category}"`,
      ...r.months.map((m) => m.toFixed(2)),
      r.actualYTD.toFixed(2),
      r.actualMTD.toFixed(2),
      (r.pctTotal * 100).toFixed(2) + '%',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...data.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `HOA_Monthly_Summary_Report_${parameters.activeYear}.csv`
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
            Sheet Code: RPT_MonthlySummary
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Multi-Period Cost Trend & Actuals Matrix
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Cross-sectional aggregation of 12-month actual disbursements categorized by primary account.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-[6px] hover:bg-[#F5F5F2] transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Summary CSV</span>
          </button>
        </div>
      </div>

      <InsightBlock title="Horizontal 12-Month Array Aggregation">
        This reporting layer executes automated cross-tabulation across the full 12-month calendar
        for FY {parameters.activeYear}. It dynamically surfaces both the YTD cumulative disbursement
        and the specific MTD slice for Month {parameters.activeMonth} ({MONTH_NAMES[parameters.activeMonth - 1]}).
      </InsightBlock>

      {/* Summary KPI Cards - Clean Minimalism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="kpi-title">Annual Cumulative Spend (YTD)</div>
          <div className="kpi-value text-[#051C2C]">
            {formatCurrency(grandTotalYTD, currency, 0)}
          </div>
          <span className="text-[11px] text-[#888888] mt-2 block border-t border-gray-100 pt-2">
            Across {rows.length} accounting categories
          </span>
        </div>

        <div className="card">
          <div className="kpi-title">Active Month Spend (MTD: M{String(parameters.activeMonth).padStart(2, '0')})</div>
          <div className="kpi-value text-[#2251FF]">
            {formatCurrency(grandTotalMTD, currency, 0)}
          </div>
          <span className="text-[11px] text-[#888888] mt-2 block border-t border-gray-100 pt-2">
            Current month assessment pool
          </span>
        </div>

        <div className="card">
          <div className="kpi-title">Dominant Cost Category</div>
          <div className="kpi-value text-[#051C2C] text-[24px] truncate">
            {[...rows].sort((a, b) => b.actualYTD - a.actualYTD)[0]?.category || 'N/A'}
          </div>
          <span className="text-[11px] text-[#888888] mt-2 block border-t border-gray-100 pt-2">
            {formatPercent(
              [...rows].sort((a, b) => b.actualYTD - a.actualYTD)[0]?.pctTotal || 0,
              1
            )}{' '}
            of total expenditures
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Monthly Spend Distribution Matrix
            </h2>
          </div>
          <span className="text-[12px] text-[#888888]">
            Active Evaluation Month:{' '}
            <strong className="text-[#2251FF]">
              M{String(parameters.activeMonth).padStart(2, '0')} (
              {MONTH_NAMES[parameters.activeMonth - 1]})
            </strong>
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr>
                <th className="table-th p-2.5 w-56 rounded-l-[6px]">Primary Account Category</th>
                {MONTH_NAMES.map((m, idx) => {
                  const isActive = idx + 1 === parameters.activeMonth;
                  return (
                    <th
                      key={m}
                      className={`table-th p-2 text-right w-20 font-mono text-[11px] ${
                        isActive ? 'bg-[rgba(34,81,255,0.08)] text-[#2251FF]' : ''
                      }`}
                    >
                      {m}
                    </th>
                  );
                })}
                <th className="table-th p-2 text-right w-28 font-semibold">Total YTD</th>
                <th className="table-th p-2 text-right w-24 font-semibold text-[#2251FF]">
                  MTD (M{String(parameters.activeMonth).padStart(2, '0')})
                </th>
                <th className="table-th p-2.5 w-44 rounded-r-[6px]">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
              {rows.map((row) => (
                <tr key={row.category} className="hover:bg-[#F5F5F2] transition-colors">
                  <td className="p-2.5 font-semibold text-[#051C2C]">{row.category}</td>
                  {row.months.map((val, mIdx) => {
                    const isActive = mIdx + 1 === parameters.activeMonth;
                    return (
                      <td
                        key={mIdx}
                        className={`p-2 text-right font-mono text-gray-700 tabular-nums ${
                          isActive ? 'bg-[rgba(34,81,255,0.03)] font-medium text-[#051C2C]' : ''
                        }`}
                      >
                        {val > 0 ? formatCurrency(val, currency, 0) : '—'}
                      </td>
                    );
                  })}
                  <td className="p-2 text-right font-bold text-[#051C2C] font-mono tabular-nums">
                    {formatCurrency(row.actualYTD, currency, 0)}
                  </td>
                  <td className="p-2 text-right font-bold text-[#2251FF] font-mono tabular-nums">
                    {formatCurrency(row.actualMTD, currency, 0)}
                  </td>
                  <td className="p-2.5">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-mono text-gray-700 text-right">
                        {formatPercent(row.pctTotal, 1)}
                      </div>
                      <InlineDataBar value={row.pctTotal} maxValue={0.5} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Grand Totals */}
            <tfoot>
              <tr className="bg-[#F5F5F2] font-bold text-[#051C2C] border-t-2 border-[#E8E8E6] text-[12px]">
                <td className="p-2.5 font-bold uppercase tracking-wider text-[11px]">
                  Total Actual Disbursements
                </td>
                {totalMonths.map((tot, idx) => (
                  <td key={idx} className="p-2 text-right font-mono text-[11px] tabular-nums">
                    {formatCurrency(tot, currency, 0)}
                  </td>
                ))}
                <td className="p-2 text-right font-bold text-[#051C2C] font-mono text-[13px] tabular-nums">
                  {formatCurrency(grandTotalYTD, currency, 0)}
                </td>
                <td className="p-2 text-right font-bold text-[#2251FF] font-mono text-[13px] tabular-nums">
                  {formatCurrency(grandTotalMTD, currency, 0)}
                </td>
                <td className="p-2.5 text-right font-mono font-bold">100.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
