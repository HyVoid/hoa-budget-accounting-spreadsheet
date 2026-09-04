import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  BudgetRow,
  CostMappingRule,
  OwnerUnit,
  Transaction,
} from '../types';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTransactions: (items: Transaction[], mode: 'append' | 'replace') => void;
  onImportBudget: (items: BudgetRow[], mode: 'append' | 'replace') => void;
  onImportOwners: (items: OwnerUnit[], mode: 'append' | 'replace') => void;
  onImportCostMapping: (items: CostMappingRule[], mode: 'append' | 'replace') => void;
}

type ImportTarget = 'transactions' | 'budget' | 'owners' | 'costMapping';

export const CsvImportModal: React.FC<CsvImportModalProps> = ({
  isOpen,
  onClose,
  onImportTransactions,
  onImportBudget,
  onImportOwners,
  onImportCostMapping,
}) => {
  const [target, setTarget] = useState<ImportTarget>('transactions');
  const [mode, setMode] = useState<'append' | 'replace'>('append');
  const [csvText, setCsvText] = useState('');
  const [parsedRows, setParsedRows] = useState<string[][]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const getSampleCsv = (t: ImportTarget): string => {
    if (t === 'transactions') {
      return `Date,Reference,Payee,Description,Amount\n2026-09-12,CHK-9901,Summit Roofing,Roof emergency leak repair,1450.00\n2026-09-18,EFT-1122,City Water Authority,Common line water consumption,2300.00`;
    } else if (t === 'budget') {
      return `Category,Subcategory,M01,M02,M03,M04,M05,M06,M07,M08,M09,M10,M11,M12\nUtilities,Water & Sewer,2400,2400,2450,2500,2600,2750,2900,2900,2700,2500,2450,2400\nMaintenance & Repairs,Elevator Service,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200`;
    } else if (t === 'owners') {
      return `UnitID,OwnerName,Building,SqFt,CustomWeight,Notes\nUnit 501,Samantha Wright,Tower A,1150,1.0,Standard unit\nUnit 502,Oliver Martinez,Tower A,1380,1.0,Corner unit`;
    } else {
      return `Keyword,Category,Subcategory,AllocationType\nroof,Maintenance & Repairs,Roof & Gutters,SqFt\nwater,Utilities,Water & Sewer,SqFt`;
    }
  };

  const handleParse = (text: string) => {
    setCsvText(text);
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmed = text.trim();
    if (!trimmed) {
      setParsedRows([]);
      return;
    }

    const lines = trimmed.split(/\r?\n/);
    const rows = lines.map((line) => {
      // Basic CSV line splitter respecting quoted fields
      const values: string[] = [];
      let inQuotes = false;
      let curVal = '';

      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
          values.push(curVal.trim());
          curVal = '';
        } else {
          curVal += c;
        }
      }
      values.push(curVal.trim());
      return values;
    });

    setParsedRows(rows);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleParse(content);
    };
    reader.readAsText(file);
  };

  const handleCommitImport = () => {
    if (parsedRows.length < 2) {
      setErrorMsg('CSV must contain a header row and at least one data row.');
      return;
    }

    try {
      const dataRows = parsedRows.slice(1).filter((r) => r.length > 1 && r.some((c) => c !== ''));

      if (target === 'transactions') {
        const items: Transaction[] = dataRows.map((r, i) => ({
          id: `trx-import-${Date.now()}-${i}`,
          date: r[0] || new Date().toISOString().split('T')[0],
          reference: r[1] || `REF-${i + 1}`,
          payee: r[2] || 'Unknown Payee',
          rawDescription: r[3] || '',
          amount: parseFloat(r[4]?.replace(/[^0-9.-]+/g, '')) || 0,
        }));
        onImportTransactions(items, mode);
        setSuccessMsg(`Successfully imported ${items.length} transactions (${mode} mode).`);
      } else if (target === 'budget') {
        const items: BudgetRow[] = dataRows.map((r, i) => {
          const months: number[] = [];
          for (let m = 2; m < 14; m++) {
            months.push(parseFloat(r[m]?.replace(/[^0-9.-]+/g, '')) || 0);
          }
          return {
            id: `bgt-import-${Date.now()}-${i}`,
            category: r[0] || 'General',
            subcategory: r[1] || 'General Expense',
            months: months.length === 12 ? months : Array(12).fill(0),
          };
        });
        onImportBudget(items, mode);
        setSuccessMsg(`Successfully imported ${items.length} budget rows (${mode} mode).`);
      } else if (target === 'owners') {
        const items: OwnerUnit[] = dataRows.map((r, i) => ({
          id: `own-import-${Date.now()}-${i}`,
          unitId: r[0] || `Unit-${i + 101}`,
          ownerName: r[1] || 'Occupant',
          building: r[2] || 'Main',
          sqft: parseFloat(r[3]?.replace(/[^0-9.]+/g, '')) || 1000,
          customWeight: parseFloat(r[4]) || 1.0,
          notes: r[5] || '',
        }));
        onImportOwners(items, mode);
        setSuccessMsg(`Successfully imported ${items.length} owner units (${mode} mode).`);
      } else if (target === 'costMapping') {
        const items: CostMappingRule[] = dataRows.map((r, i) => ({
          id: `cm-import-${Date.now()}-${i}`,
          keyword: r[0] || '',
          category: r[1] || 'General',
          subcategory: r[2] || 'General Expense',
          allocationType: (['SqFt', 'Equal', 'Weight', 'Exclude'].includes(r[3])
            ? r[3]
            : 'SqFt') as any,
        }));
        onImportCostMapping(items, mode);
        setSuccessMsg(`Successfully imported ${items.length} mapping rules (${mode} mode).`);
      }

      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
        setCsvText('');
        setParsedRows([]);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(`Failed to parse CSV: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,28,44,0.4)] backdrop-blur-sm p-4 animate-fade-up">
      <div className="bg-white rounded-[14px] p-6 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display font-semibold text-xl text-[#051C2C]">
              Bulk CSV Import
            </h3>
            <p className="text-[12px] text-[#888888]">
              Paste or upload CSV rows to populate transactions, budget, units, or mapping rules.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target & Mode Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
              Target Destination Table
            </label>
            <select
              value={target}
              onChange={(e) => {
                const newT = e.target.value as ImportTarget;
                setTarget(newT);
                handleParse(getSampleCsv(newT));
              }}
              className="w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-[#E8E8E6] bg-white text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
            >
              <option value="transactions">INP_Transactions (Bank / Expense Ledger)</option>
              <option value="budget">INP_Budget (Approved 12-Month Plan)</option>
              <option value="owners">DIM_Owners (Units & Property Registry)</option>
              <option value="costMapping">DIM_CostMapping (Keyword Rules)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
              Import Mode
            </label>
            <div className="flex items-center gap-4 h-[34px]">
              <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  checked={mode === 'append'}
                  onChange={() => setMode('append')}
                  className="text-[#2251FF]"
                />
                <span>Append to existing rows</span>
              </label>
              <label className="flex items-center gap-1.5 text-[13px] cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  checked={mode === 'replace'}
                  onChange={() => setMode('replace')}
                  className="text-[#2251FF]"
                />
                <span className="text-[#D32F2F]">Replace entire table</span>
              </label>
            </div>
          </div>
        </div>

        {/* Paste or Upload Area */}
        <div className="space-y-2 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#051C2C]">
              CSV Raw Text or File
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleParse(getSampleCsv(target))}
                className="text-[11px] text-[#2251FF] hover:underline cursor-pointer"
              >
                Load sample template
              </button>
              <label className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[6px] cursor-pointer transition-colors">
                <Upload className="w-3 h-3 text-gray-600" />
                <span>Upload .csv</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <textarea
            value={csvText}
            onChange={(e) => handleParse(e.target.value)}
            rows={5}
            placeholder="Paste your comma-separated values here with headers..."
            className="w-full text-[12px] font-mono p-3 rounded-[6px] border border-[#E8E8E6] bg-[#FFFDE7] text-[#1A1A2E] focus:outline-none focus:border-[#2251FF]"
          />

          {/* Parsed Preview */}
          {parsedRows.length > 0 && (
            <div className="mt-3 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#888888] flex items-center justify-between">
                <span>Preview: {parsedRows.length - 1} rows parsed</span>
                <span className="text-gray-500 font-normal">
                  Showing top {Math.min(parsedRows.length - 1, 4)} rows
                </span>
              </div>
              <div className="border border-[#E8E8E6] rounded-[8px] overflow-hidden max-h-[140px] overflow-x-auto text-[11px]">
                <table className="w-full text-left">
                  <thead className="bg-[#F5F5F2] border-b border-[#E8E8E6]">
                    <tr>
                      {parsedRows[0]?.map((col, idx) => (
                        <th key={idx} className="p-2 font-semibold text-[#051C2C] whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedRows.slice(1, 5).map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-gray-100">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 whitespace-nowrap text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 p-2.5 rounded-[6px] bg-[rgba(211,47,47,0.08)] text-[#D32F2F] text-[12px]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-2.5 rounded-[6px] bg-[rgba(0,200,83,0.1)] text-[#00C853] text-[12px]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E8E6]">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[6px] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCommitImport}
            disabled={parsedRows.length < 2}
            className="flex items-center gap-1.5 px-5 py-1.5 text-[12px] font-medium text-white bg-[#2251FF] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-[6px] transition-colors cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Process & Import</span>
          </button>
        </div>
      </div>
    </div>
  );
};
