import React, { useState } from 'react';
import {
  Building2,
  Sliders,
  BookOpen,
  Users,
  Receipt,
  PiggyBank,
  Sparkles,
  PieChart,
  ShieldAlert,
  CalendarDays,
  Scale,
  Download,
  Upload,
  FileSpreadsheet,
  RotateCcw,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { SheetTab } from '../types';

interface NavbarProps {
  activeTab: SheetTab;
  onSelectTab: (tab: SheetTab) => void;
  lastSavedText: string;
  hasUnsavedChanges?: boolean;
  onExportBackup: () => void;
  onImportBackup: () => void;
  onOpenCsvImport: () => void;
  onResetData: () => void;
  anomalyCount?: number;
}

const TAB_CONFIG: {
  id: SheetTab;
  label: string;
  sheetCode: string;
  category: 'Presentation' | 'Config' | 'Input' | 'Engine' | 'Report';
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'DASH_Management', label: 'Executive Cockpit', sheetCode: 'DASH_Management', category: 'Presentation', icon: Building2 },
  { id: 'SYS_Parameters', label: 'Global Parameters', sheetCode: 'SYS_Parameters', category: 'Config', icon: Sliders },
  { id: 'DIM_CostMapping', label: 'Cost Rules', sheetCode: 'DIM_CostMapping', category: 'Config', icon: BookOpen },
  { id: 'DIM_Owners', label: 'Owners & Units', sheetCode: 'DIM_Owners', category: 'Config', icon: Users },
  { id: 'INP_Transactions', label: 'Raw Ledger', sheetCode: 'INP_Transactions', category: 'Input', icon: Receipt },
  { id: 'INP_Budget', label: 'Approved Budget', sheetCode: 'INP_Budget', category: 'Input', icon: PiggyBank },
  { id: 'ENG_CostCleansing', label: 'Cleansing Engine', sheetCode: 'ENG_CostCleansing', category: 'Engine', icon: Sparkles },
  { id: 'ENG_Allocation', label: 'Cost Allocation', sheetCode: 'ENG_Allocation', category: 'Engine', icon: PieChart },
  { id: 'SYS_Validation', label: 'Data Quality & Audit', sheetCode: 'SYS_Validation', category: 'Engine', icon: ShieldAlert },
  { id: 'RPT_MonthlySummary', label: 'Monthly Summary', sheetCode: 'RPT_MonthlySummary', category: 'Report', icon: CalendarDays },
  { id: 'RPT_BudgetVariance', label: 'Budget Variance', sheetCode: 'RPT_BudgetVariance', category: 'Report', icon: Scale },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  lastSavedText,
  hasUnsavedChanges,
  onExportBackup,
  onImportBackup,
  onOpenCsvImport,
  onResetData,
  anomalyCount = 0,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white border-b border-[#E5E5E1]"
        style={{ height: '56px' }}
      >
        <div className="max-w-[1400px] mx-auto h-full px-10 flex items-center justify-between gap-6">
          {/* Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-[8px] bg-[#051C2C] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <span className="font-display tracking-tight text-white font-semibold">HOA</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-[#051C2C] text-[18px] tracking-tight">
                AssetLogic Pro
              </div>
              <div className="text-[10px] text-[#888888] font-semibold uppercase tracking-wider">
                HOA Cost Engine
              </div>
            </div>
          </div>

          {/* Middle Nav Tabs - Clean Minimalism Style */}
          <nav className="flex items-center h-full overflow-x-auto no-scrollbar scroll-smooth gap-4 lg:gap-6 py-0">
            {TAB_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isValidation = tab.id === 'SYS_Validation';

              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  title={tab.sheetCode}
                  className={`relative flex items-center gap-1.5 px-1 h-full text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? 'text-[#2251FF]'
                      : 'text-[#888888] hover:text-[#051C2C]'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-[#2251FF]' : 'text-[#888888]'
                    }`}
                  />
                  <span>{tab.label}</span>
                  {isValidation && anomalyCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#FFEBEE] text-[#D32F2F] font-semibold">
                      {anomalyCount}
                    </span>
                  )}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2251FF]"
                      style={{ transition: 'all 200ms ease' }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Last Saved Badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F5F5F2] text-[#051C2C] text-[11px] font-semibold"
              title="Saved to browser localStorage automatically"
            >
              <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider">
                Last saved:
              </span>
              <span className="font-bold text-[#051C2C] tabular-nums text-[11px]">{lastSavedText}</span>
            </div>

            {/* Bulk CSV Import */}
            <button
              onClick={onOpenCsvImport}
              className="bg-white px-2.5 py-1.5 rounded border border-gray-200 text-xs font-semibold text-[#051C2C] hover:bg-gray-50 transition-colors cursor-pointer"
              title="Bulk import CSV data into any table"
            >
              <span className="hidden sm:inline">Bulk CSV</span>
            </button>

            {/* Export Backup */}
            <button
              onClick={onExportBackup}
              className="bg-white px-2.5 py-1.5 rounded border border-gray-200 text-xs font-semibold text-[#051C2C] hover:bg-gray-50 transition-colors cursor-pointer"
              title="Download full database JSON backup"
            >
              <span className="hidden sm:inline">Export Backup</span>
            </button>

            {/* Import Backup */}
            <button
              onClick={onImportBackup}
              className="text-white px-3 py-1.5 rounded text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              style={{ backgroundColor: 'var(--brand)' }}
              title="Restore from database JSON backup"
            >
              <span className="hidden sm:inline">Import Backup</span>
            </button>

            {/* Reset Data */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="bg-red-50 text-red-600 px-2.5 py-1.5 rounded text-xs font-semibold border hover:bg-red-100 transition-colors cursor-pointer"
              style={{ color: '#D32F2F', borderColor: 'rgba(211,47,47,0.1)' }}
              title="Reset data to standard HOA template"
            >
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,28,44,0.4)] backdrop-blur-sm p-4 animate-fade-up">
          <div className="bg-white rounded-[14px] p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-[#D32F2F]">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-display font-semibold text-lg text-[#051C2C]">
                Reset to Default HOA Template?
              </h3>
            </div>
            <p className="text-[13px] text-[#1A1A2E] leading-relaxed">
              This will overwrite all active transactions, owners, budget data, and rules in
              localStorage with the standard 2026 Fiscal Year HOA seed dataset.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-1.5 text-[12px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[6px] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-1.5 text-[12px] font-medium text-white bg-[#D32F2F] hover:bg-red-700 rounded-[6px] transition-colors cursor-pointer shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
