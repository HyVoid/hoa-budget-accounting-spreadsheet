import React, { useState } from 'react';
import { PieChart, Download, FileText, CheckCircle2 } from 'lucide-react';
import { SystemParameters, UnitAllocationResult } from '../types';
import { formatCurrency, formatPercent } from '../utils/engine';
import { InlineDataBar } from './InlineDataBar';
import { InsightBlock } from './InsightBlock';

interface AllocationViewProps {
  allocations: {
    totalPool: number;
    totalUnits: number;
    totalSqFt: number;
    unitResults: UnitAllocationResult[];
  };
  parameters: SystemParameters;
  onMethodChange: (method: 'SqFt' | 'Equal' | 'Weight') => void;
}

export const AllocationView: React.FC<AllocationViewProps> = ({
  allocations,
  parameters,
  onMethodChange,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<UnitAllocationResult | null>(null);
  const currency = parameters.currencySymbol;
  const { totalPool, totalUnits, totalSqFt, unitResults } = allocations;

  const totalAssessed = unitResults.reduce((sum, u) => sum + u.finalAssessment, 0);
  const maxAssessment = Math.max(...unitResults.map((u) => u.finalAssessment), 1);

  const handleExportCsv = () => {
    const headers = [
      'Unit ID',
      'Owner Name',
      'Building',
      'SqFt',
      'SqFt Weight',
      'Equal Weight',
      'Area Share',
      'Equal Share',
      'Active Method',
      'Final Assessment',
    ];

    const rows = unitResults.map((u) => [
      u.unitId,
      `"${u.ownerName}"`,
      u.building,
      u.sqft,
      (u.sqftWeight * 100).toFixed(4) + '%',
      (u.equalWeight * 100).toFixed(4) + '%',
      u.shareSqFt.toFixed(2),
      u.shareEqual.toFixed(2),
      u.activeMethod,
      u.finalAssessment.toFixed(2),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `HOA_Assessment_Schedule_Month_${parameters.activeMonth}_${parameters.activeYear}.csv`
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
            Sheet Code: ENG_Allocation
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Multi-Track Expense Allocation Engine
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Real-time apportionment of the active month common expense pool across owner deed shares.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-[6px] hover:bg-[#F5F5F2] transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Assessment CSV</span>
          </button>
        </div>
      </div>

      <InsightBlock title="Transparent Dual-Track Reconciliation">
        The table dynamically calculates both <strong>Area-Proportional (SqFt)</strong> and{' '}
        <strong>Equal-Per-Door (Equal)</strong> calculations side by side. The Board can simulate
        policy adjustments by changing the active method below without altering registered title
        deeds. Total assessed sum matches the active expenditure pool to the penny.
      </InsightBlock>

      {/* Control Summary Cards - Clean Minimalism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pool Total (C4) */}
        <div className="card">
          <div className="kpi-title">
            Active Pool (C4: ALC_Total_Pool)
          </div>
          <div className="kpi-value text-[#051C2C]">
            {formatCurrency(totalPool, currency, 2)}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 border-t border-gray-100 pt-2">
            Month {parameters.activeMonth}, {parameters.activeYear} Cleansed Spend
          </div>
        </div>

        {/* Total Units (C5) */}
        <div className="card">
          <div className="kpi-title">
            Assessed Units (C5: ALC_Total_Units)
          </div>
          <div className="kpi-value text-[#051C2C]">
            {totalUnits} Units
          </div>
          <div className="text-[11px] text-[#888888] mt-2 border-t border-gray-100 pt-2">
            Across {totalSqFt.toLocaleString()} sqft community area
          </div>
        </div>

        {/* Selected Allocation Mode */}
        <div className="card">
          <div className="kpi-title">
            Active Apportionment Mode
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            {(['SqFt', 'Equal', 'Weight'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onMethodChange(mode)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  parameters.defaultAllocation === mode
                    ? 'bg-[#2251FF] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-[#051C2C] hover:bg-gray-50'
                }`}
              >
                {mode === 'SqFt' ? 'By SqFt' : mode === 'Equal' ? 'Equal' : 'Weighted'}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 border-t border-gray-100 pt-2">
            Switch mode to instantly recalculate all assessments
          </div>
        </div>

        {/* Verification Check */}
        <div className="card">
          <div className="kpi-title">
            Mathematical Balance Check
          </div>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-6 h-6 text-[#00C853]" />
            <div>
              <div className="kpi-value text-[24px] text-[#051C2C]">
                {formatCurrency(totalAssessed, currency, 2)}
              </div>
              <div className="text-[11px] text-[#00C853] font-semibold">
                Pool perfectly allocated (Diff: {formatCurrency(Math.abs(totalAssessed - totalPool), currency, 2)})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Allocation Matrix */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Owner Assessment Schedule (Month {parameters.activeMonth})
            </h2>
          </div>
          <span className="text-[12px] text-[#888888]">
            Click any row to generate an assessment voucher preview
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-th p-2.5 w-24 rounded-l-[6px]">Unit ID</th>
                <th className="table-th p-2.5">Owner / Resident</th>
                <th className="table-th p-2.5 w-28">Wing</th>
                <th className="table-th p-2.5 text-right w-24">Area (SqFt)</th>
                <th className="table-th p-2.5 text-right w-28">SqFt Share %</th>
                <th className="table-th p-2.5 text-right w-28">Equal Share %</th>
                <th className="table-th p-2.5 text-right w-32">By SqFt ({currency})</th>
                <th className="table-th p-2.5 text-right w-32">By Equal ({currency})</th>
                <th className="table-th p-2.5 text-right w-44 font-bold rounded-r-[6px]">
                  Final Assessment ({currency})
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {unitResults.map((unit) => (
                <tr
                  key={unit.unitId}
                  onClick={() => setSelectedUnit(unit)}
                  className="interactive-cell hover:bg-[#F5F5F2] cursor-pointer transition-colors"
                >
                  <td className="p-2.5 font-semibold text-[#051C2C] font-mono text-[12px]">
                    {unit.unitId}
                  </td>
                  <td className="p-2.5 font-medium text-[#051C2C]">{unit.ownerName}</td>
                  <td className="p-2.5 text-gray-600 text-[12px]">{unit.building}</td>
                  <td className="p-2.5 text-right font-mono text-gray-700">
                    {unit.sqft.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right font-mono text-gray-600">
                    {formatPercent(unit.sqftWeight, 3)}
                  </td>
                  <td className="p-2.5 text-right font-mono text-gray-600">
                    {formatPercent(unit.equalWeight, 3)}
                  </td>
                  <td className="p-2.5 text-right font-mono text-gray-600 tabular-nums">
                    {formatCurrency(unit.shareSqFt, currency, 2)}
                  </td>
                  <td className="p-2.5 text-right font-mono text-gray-600 tabular-nums">
                    {formatCurrency(unit.shareEqual, currency, 2)}
                  </td>
                  <td className="p-2.5 text-right tabular-nums">
                    <div className="font-bold text-[#051C2C] text-[14px]">
                      {formatCurrency(unit.finalAssessment, currency, 2)}
                    </div>
                    <div className="w-28 ml-auto mt-0.5">
                      <InlineDataBar value={unit.finalAssessment} maxValue={maxAssessment} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Grand Total Row */}
            <tfoot>
              <tr className="bg-[#F5F5F2] font-bold text-[#051C2C] border-t-2 border-[#E8E8E6]">
                <td colSpan={3} className="p-3 uppercase text-[11px] tracking-wider">
                  Total Community Assessment
                </td>
                <td className="p-3 text-right font-mono">{totalSqFt.toLocaleString()} sqft</td>
                <td className="p-3 text-right font-mono">100.000%</td>
                <td className="p-3 text-right font-mono">100.000%</td>
                <td className="p-3 text-right font-mono">{formatCurrency(totalPool, currency, 2)}</td>
                <td className="p-3 text-right font-mono">{formatCurrency(totalPool, currency, 2)}</td>
                <td className="p-3 text-right font-bold text-[#2251FF] font-mono text-[15px]">
                  {formatCurrency(totalAssessed, currency, 2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Assessment Slip Voucher Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,28,44,0.4)] backdrop-blur-sm p-4 animate-fade-up">
          <div className="bg-white rounded-[14px] p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2251FF]" />
                <h3 className="font-display font-semibold text-lg text-[#051C2C]">
                  Official HOA Assessment Notice
                </h3>
              </div>
              <button
                onClick={() => setSelectedUnit(null)}
                className="text-gray-400 hover:text-gray-700 text-[13px] font-medium"
              >
                Close
              </button>
            </div>

            <div className="bg-[#F5F5F2] p-4 rounded-[10px] space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Unit Number:</span>
                <span className="font-bold text-[#051C2C]">{selectedUnit.unitId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Owner Name:</span>
                <span className="font-medium text-[#051C2C]">{selectedUnit.ownerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Building / Wing:</span>
                <span className="text-[#051C2C]">{selectedUnit.building}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Registered Area:</span>
                <span className="font-mono text-[#051C2C]">{selectedUnit.sqft} sqft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Deed Area Weight:</span>
                <span className="font-mono text-[#051C2C]">
                  {formatPercent(selectedUnit.sqftWeight, 4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Billing Period:</span>
                <span className="text-[#051C2C]">
                  Month {parameters.activeMonth}, {parameters.activeYear}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8E8E6] flex justify-between items-baseline">
                <span className="font-semibold text-[#051C2C]">Amount Due:</span>
                <span className="font-display font-bold text-[24px] text-[#2251FF] tabular-nums">
                  {formatCurrency(selectedUnit.finalAssessment, currency, 2)}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#888888] italic">
              Apportionment method: {selectedUnit.activeMethod} based on total pool of{' '}
              {formatCurrency(totalPool, currency, 2)}.
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedUnit(null)}
                className="px-4 py-1.5 text-[12px] font-medium text-white bg-[#051C2C] hover:bg-black rounded-[6px] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
