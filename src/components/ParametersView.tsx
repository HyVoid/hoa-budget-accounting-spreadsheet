import React from 'react';
import { Sliders, HelpCircle, RefreshCw } from 'lucide-react';
import { SystemParameters } from '../types';
import { InsightBlock } from './InsightBlock';

interface ParametersViewProps {
  parameters: SystemParameters;
  onChange: (updated: SystemParameters) => void;
}

export const ParametersView: React.FC<ParametersViewProps> = ({
  parameters,
  onChange,
}) => {
  const updateField = <K extends keyof SystemParameters>(
    field: K,
    value: SystemParameters[K]
  ) => {
    onChange({
      ...parameters,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
            Sheet Code: SYS_Parameters
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            System Control & Global Parameters
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Single point of truth for simulation thresholds, currency tokens, and reporting slices.
          </p>
        </div>
      </div>

      <InsightBlock title="Single Point of Control & Zero Hardcoding Guarantee">
        All financial thresholds, calendar filters, and allocation formulas read directly from this
        central parameters matrix. Modifying any cell immediately recalculates the cost cleansing
        engine, owner assessments, and variance warnings across all 10 downstream sheets without
        reloading.
      </InsightBlock>

      {/* Main Parameters Table Container - Clean Minimalism */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Global Configuration Matrix
            </h2>
          </div>
          <span className="text-[11px] text-[#888888] flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-[#FFFDE7] border border-amber-200 mr-1" />
            Pale yellow indicates user-editable input
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-th p-3 w-16 text-center rounded-l-[6px]">Cell</th>
                <th className="table-th p-3">Parameter Variable</th>
                <th className="table-th p-3">Data Type</th>
                <th className="table-th p-3 w-64">Live Value (Editable)</th>
                <th className="table-th p-3 rounded-r-[6px]">Functional Scope & Formula Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {/* Row C4: PAR_Currency_Symbol */}
              <tr className="hover:bg-[#F5F5F2] transition-colors">
                <td className="p-3 text-center font-mono text-[12px] text-gray-500 font-semibold">
                  C4
                </td>
                <td className="p-3">
                  <div className="font-semibold text-[#051C2C]">PAR_Currency_Symbol</div>
                  <div className="text-[11px] text-[#888888]">Base Currency Token</div>
                </td>
                <td className="p-3 text-gray-600 font-mono text-[12px]">Text / Symbol</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={parameters.currencySymbol}
                    onChange={(e) => updateField('currencySymbol', e.target.value)}
                    maxLength={5}
                    className="cell-editable px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] font-semibold text-[14px] w-24 text-center focus:outline-none focus:border-[#2251FF]"
                  />
                </td>
                <td className="p-3 text-[#1A1A2E] text-[12px] leading-relaxed">
                  Controls dynamic currency symbol across all cards, assessment notices, and
                  variance statements (e.g. $, €, ¥, £).
                </td>
              </tr>

              {/* Row C5: PAR_Active_Year */}
              <tr className="hover:bg-[#F5F5F2] transition-colors">
                <td className="p-3 text-center font-mono text-[12px] text-gray-500 font-semibold">
                  C5
                </td>
                <td className="p-3">
                  <div className="font-semibold text-[#051C2C]">PAR_Active_Year</div>
                  <div className="text-[11px] text-[#888888]">Evaluation Fiscal Year</div>
                </td>
                <td className="p-3 text-gray-600 font-mono text-[12px]">Integer (YYYY)</td>
                <td className="p-3">
                  <input
                    type="number"
                    value={parameters.activeYear}
                    onChange={(e) => updateField('activeYear', parseInt(e.target.value) || 2026)}
                    min={2000}
                    max={2099}
                    className="cell-editable px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] font-semibold text-[14px] w-32 focus:outline-none focus:border-[#2251FF]"
                  />
                </td>
                <td className="p-3 text-[#1A1A2E] text-[12px] leading-relaxed">
                  Drives primary date filter for transaction ingestion and multi-year comparative
                  aggregation.
                </td>
              </tr>

              {/* Row C6: PAR_Active_Month */}
              <tr className="hover:bg-[#F5F5F2] transition-colors">
                <td className="p-3 text-center font-mono text-[12px] text-gray-500 font-semibold">
                  C6
                </td>
                <td className="p-3">
                  <div className="font-semibold text-[#051C2C]">PAR_Active_Month</div>
                  <div className="text-[11px] text-[#888888]">Active Evaluation Month</div>
                </td>
                <td className="p-3 text-gray-600 font-mono text-[12px]">Integer (1–12)</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={parameters.activeMonth}
                      onChange={(e) => updateField('activeMonth', parseInt(e.target.value) || 1)}
                      className="cell-editable px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] font-semibold text-[14px] focus:outline-none focus:border-[#2251FF]"
                    >
                      {[
                        'January (M01)',
                        'February (M02)',
                        'March (M03)',
                        'April (M04)',
                        'May (M05)',
                        'June (M06)',
                        'July (M07)',
                        'August (M08)',
                        'September (M09)',
                        'October (M10)',
                        'November (M11)',
                        'December (M12)',
                      ].map((name, i) => (
                        <option key={i + 1} value={i + 1}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="p-3 text-[#1A1A2E] text-[12px] leading-relaxed">
                  Governs MTD slice cutoffs, drives YTD budget cumulation limits, and locks the
                  monthly assessment allocation pool.
                </td>
              </tr>

              {/* Row C7: PAR_Variance_Threshold */}
              <tr className="hover:bg-[#F5F5F2] transition-colors">
                <td className="p-3 text-center font-mono text-[12px] text-gray-500 font-semibold">
                  C7
                </td>
                <td className="p-3">
                  <div className="font-semibold text-[#051C2C]">PAR_Variance_Threshold</div>
                  <div className="text-[11px] text-[#888888]">Overrun Alert Percentage</div>
                </td>
                <td className="p-3 text-gray-600 font-mono text-[12px]">Percentage (0.0%–100%)</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      max="1.00"
                      value={parameters.varianceThreshold}
                      onChange={(e) => updateField('varianceThreshold', parseFloat(e.target.value) || 0.1)}
                      className="cell-editable px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] font-semibold text-[14px] w-24 text-right focus:outline-none focus:border-[#2251FF]"
                    />
                    <span className="text-[12px] text-[#888888] font-medium">
                      ({(parameters.varianceThreshold * 100).toFixed(0)}%)
                    </span>
                  </div>
                </td>
                <td className="p-3 text-[#1A1A2E] text-[12px] leading-relaxed">
                  Threshold triggering &quot;Severe Overrun&quot; status pill (red) when actual spend
                  exceeds baseline budget by this percentage.
                </td>
              </tr>

              {/* Row C8: PAR_Duplicate_Days */}
              <tr className="hover:bg-[#F5F5F2] transition-colors">
                <td className="p-3 text-center font-mono text-[12px] text-gray-500 font-semibold">
                  C8
                </td>
                <td className="p-3">
                  <div className="font-semibold text-[#051C2C]">PAR_Duplicate_Days</div>
                  <div className="text-[11px] text-[#888888]">Duplicate Payment Window</div>
                </td>
                <td className="p-3 text-gray-600 font-mono text-[12px]">Integer (Days)</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={parameters.duplicateDays}
                      onChange={(e) => updateField('duplicateDays', parseInt(e.target.value) || 3)}
                      className="cell-editable px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] font-semibold text-[14px] w-20 text-center focus:outline-none focus:border-[#2251FF]"
                    />
                    <span className="text-[12px] text-[#888888]">days</span>
                  </div>
                </td>
                <td className="p-3 text-[#1A1A2E] text-[12px] leading-relaxed">
                  Tolerance window for the fraud/error detection algorithm. Flags identical payees
                  and amounts billed within N calendar days.
                </td>
              </tr>

              {/* Row C9: PAR_Default_Allocation */}
              <tr className="hover:bg-[#F5F5F2] transition-colors">
                <td className="p-3 text-center font-mono text-[12px] text-gray-500 font-semibold">
                  C9
                </td>
                <td className="p-3">
                  <div className="font-semibold text-[#051C2C]">PAR_Default_Allocation</div>
                  <div className="text-[11px] text-[#888888]">Default Assessment Mechanism</div>
                </td>
                <td className="p-3 text-gray-600 font-mono text-[12px]">Formula Enum Option</td>
                <td className="p-3">
                  <select
                    value={parameters.defaultAllocation}
                    onChange={(e) => updateField('defaultAllocation', e.target.value as any)}
                    className="cell-editable px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] font-semibold text-[13px] focus:outline-none focus:border-[#2251FF]"
                  >
                    <option value="SqFt">SqFt (By Registered Area)</option>
                    <option value="Equal">Equal (Equal Division per Unit)</option>
                    <option value="Weight">Weight (Custom Factor Weighted)</option>
                  </select>
                </td>
                <td className="p-3 text-[#1A1A2E] text-[12px] leading-relaxed">
                  Default apportionment formula applied to common expenses in ENG_Allocation unless
                  overridden in DIM_CostMapping rules.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
