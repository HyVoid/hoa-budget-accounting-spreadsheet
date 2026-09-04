import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, FileQuestion, RefreshCw } from 'lucide-react';
import { SystemParameters, ValidationSummary } from '../types';
import { formatCurrency } from '../utils/engine';
import { InsightBlock } from './InsightBlock';
import { StatusBadge } from './StatusBadge';

interface ValidationViewProps {
  validation: ValidationSummary;
  parameters: SystemParameters;
  onNavigate: (tab: any) => void;
}

export const ValidationView: React.FC<ValidationViewProps> = ({
  validation,
  parameters,
  onNavigate,
}) => {
  const currency = parameters.currencySymbol;
  const isHealthy = validation.totalIssues === 0;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
            Sheet Code: SYS_Validation
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Data Quality & Internal Control Firewall
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Automated internal audit detecting duplicate disbursements, unmapped vendors, and credit anomalies.
          </p>
        </div>
      </div>

      <InsightBlock
        title="Automated Audit & Fraud Prevention Guardrails"
        actionText={validation.unmappedCount > 0 ? 'Fix Unmapped Rules' : undefined}
        onAction={() => onNavigate('DIM_CostMapping')}
      >
        The validation engine scans raw ledger entries against three critical risk vectors:
        (1) duplicate vendor disbursements issued within {parameters.duplicateDays} calendar days;
        (2) unmapped ledger entries lacking categorization rules; and (3) negative adjustments or
        vendor credits requiring separate Board sign-off.
      </InsightBlock>

      {/* 4 Metric Status Cards (B5 to E5) - Clean Minimalism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Duplicate Payments */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Duplicate Payment Risk (B5)</div>
            <AlertTriangle
              className={`w-4 h-4 ${validation.dupCount > 0 ? 'text-[#D32F2F]' : 'text-gray-400'}`}
            />
          </div>
          <div
            className={`kpi-value ${
              validation.dupCount > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}
          >
            {validation.dupCount}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 border-t border-gray-100 pt-2">
            Same payee & amount within {parameters.duplicateDays} days
          </div>
        </div>

        {/* Card 2: Unmapped Classifications */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Unmapped Entries (C5)</div>
            <FileQuestion
              className={`w-4 h-4 ${validation.unmappedCount > 0 ? 'text-[#D32F2F]' : 'text-gray-400'}`}
            />
          </div>
          <div
            className={`kpi-value ${
              validation.unmappedCount > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}
          >
            {validation.unmappedCount}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 border-t border-gray-100 pt-2">
            Keywords missing from classification dictionary
          </div>
        </div>

        {/* Card 3: Refund / Negative Lines */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Negative Adjustments (D5)</div>
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </div>
          <div className="kpi-value text-[#051C2C]">
            {validation.negativeCount}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 border-t border-gray-100 pt-2">
            Vendor credits or chargeback reversals
          </div>
        </div>

        {/* Card 4: Overall System Health (E5) */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="kpi-title">Audit Health Index (E5)</div>
            {isHealthy ? (
              <ShieldCheck className="w-4 h-4 text-[#00C853]" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-[#D32F2F]" />
            )}
          </div>
          <div className="mt-2">
            <StatusBadge
              label={isHealthy ? 'System Health: OK' : `${validation.totalIssues} Issues Requiring Action`}
              variant={isHealthy ? 'positive' : 'negative'}
            />
          </div>
          <div className="text-[11px] text-[#888888] mt-3 border-t border-gray-100 pt-2">
            {isHealthy
              ? 'All records compliant with accounting checks'
              : 'Action required before finalizing month-end close'}
          </div>
        </div>
      </div>

      {/* Anomaly Drill-Down Table (A9 to G) */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <ShieldAlert
              className={`w-4 h-4 ${validation.anomalyRows.length > 0 ? 'text-[#D32F2F]' : 'text-[#00C853]'}`}
            />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Flagged Transactions Audit Table ({validation.anomalyRows.length} Items)
            </h2>
          </div>
          <span className="text-[12px] text-[#888888]">
            Dynamic filter pulling solely problem records
          </span>
        </div>

        {validation.anomalyRows.length === 0 ? (
          <div className="py-12 text-center text-[#888888] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#00C853] mx-auto" />
            <div className="font-medium text-[#051C2C] text-[14px]">
              No Ledger Discrepancies Detected
            </div>
            <p className="text-[12px] max-w-md mx-auto">
              All transactions have valid categorizations, no duplicate vendor payments were found
              within the {parameters.duplicateDays}-day window, and balances reconcile cleanly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="table-th p-2.5 w-24 rounded-l-[6px]">Audit ID</th>
                  <th className="table-th p-2.5 w-28">Date</th>
                  <th className="table-th p-2.5 w-48">Payee</th>
                  <th className="table-th p-2.5 text-right w-28">Amount ({currency})</th>
                  <th className="table-th p-2.5 w-32 text-center">Duplicate Flag</th>
                  <th className="table-th p-2.5 w-32 text-center">Rule Flag</th>
                  <th className="table-th p-2.5">Audit Diagnosis & Correction Protocol</th>
                  <th className="table-th p-2.5 text-center w-28 rounded-r-[6px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
                {validation.anomalyRows.map((anomaly) => (
                  <tr key={anomaly.id} className="anomaly-row hover:bg-red-50/50 transition-colors">
                    <td className="p-2.5 font-mono font-semibold text-[#051C2C]">
                      {anomaly.trxId}
                    </td>
                    <td className="p-2.5 font-mono text-gray-600">{anomaly.date}</td>
                    <td className="p-2.5 font-medium text-[#051C2C]">{anomaly.payee}</td>
                    <td className="p-2.5 text-right font-mono font-bold tabular-nums">
                      <span className={anomaly.amount < 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'}>
                        {formatCurrency(anomaly.amount, currency, 2)}
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      {anomaly.isDuplicate ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[rgba(211,47,47,0.15)] text-[#D32F2F]">
                          ⚠️ Duplicate Risk
                        </span>
                      ) : (
                        <span className="text-gray-400">Normal</span>
                      )}
                    </td>
                    <td className="p-2.5 text-center">
                      {anomaly.isUnmapped ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[rgba(211,47,47,0.15)] text-[#D32F2F]">
                          ⚠️ Missing Rule
                        </span>
                      ) : (
                        <span className="text-gray-400">Mapped</span>
                      )}
                    </td>
                    <td className="p-2.5 text-[#D32F2F] font-medium">{anomaly.diagnosis}</td>
                    <td className="p-2.5 text-center">
                      {anomaly.isUnmapped ? (
                        <button
                          onClick={() => onNavigate('DIM_CostMapping')}
                          className="px-2 py-1 text-[11px] font-medium text-[#2251FF] border border-[#2251FF] rounded-[4px] hover:bg-[#2251FF] hover:text-white transition-colors cursor-pointer"
                        >
                          Add Rule
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigate('INP_Transactions')}
                          className="px-2 py-1 text-[11px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[4px] transition-colors cursor-pointer"
                        >
                          Inspect
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
