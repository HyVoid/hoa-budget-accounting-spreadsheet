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
  Menu,
  X,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { SheetTab } from '../types';

interface SidebarProps {
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

interface TabGroup {
  groupName: string;
  items: {
    id: SheetTab;
    label: string;
    sheetCode: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const TAB_GROUPS: TabGroup[] = [
  {
    groupName: 'Overview',
    items: [
      { id: 'DASH_Management', label: 'Executive Cockpit', sheetCode: 'DASH_Management', icon: Building2 },
    ],
  },
  {
    groupName: 'Master Data & Config',
    items: [
      { id: 'SYS_Parameters', label: 'Global Parameters', sheetCode: 'SYS_Parameters', icon: Sliders },
      { id: 'DIM_CostMapping', label: 'Cost Rules', sheetCode: 'DIM_CostMapping', icon: BookOpen },
      { id: 'DIM_Owners', label: 'Owners & Units', sheetCode: 'DIM_Owners', icon: Users },
    ],
  },
  {
    groupName: 'Data Input',
    items: [
      { id: 'INP_Transactions', label: 'Raw Ledger', sheetCode: 'INP_Transactions', icon: Receipt },
      { id: 'INP_Budget', label: 'Approved Budget', sheetCode: 'INP_Budget', icon: PiggyBank },
    ],
  },
  {
    groupName: 'Calculation Engines',
    items: [
      { id: 'ENG_CostCleansing', label: 'Cleansing Engine', sheetCode: 'ENG_CostCleansing', icon: Sparkles },
      { id: 'ENG_Allocation', label: 'Cost Allocation', sheetCode: 'ENG_Allocation', icon: PieChart },
      { id: 'SYS_Validation', label: 'Data Quality & Audit', sheetCode: 'SYS_Validation', icon: ShieldAlert },
    ],
  },
  {
    groupName: 'Financial Reports',
    items: [
      { id: 'RPT_MonthlySummary', label: 'Monthly Summary', sheetCode: 'RPT_MonthlySummary', icon: CalendarDays },
      { id: 'RPT_BudgetVariance', label: 'Budget Variance', sheetCode: 'RPT_BudgetVariance', icon: Scale },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSelect = (tab: SheetTab) => {
    onSelectTab(tab);
    setIsMobileOpen(false);
  };

  const renderNavContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E5E5E1] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[8px] bg-[#051C2C] flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0">
            <span className="font-display tracking-tight text-white font-semibold">HOA</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-[#051C2C] text-[17px] tracking-tight">
              AssetLogic Pro
            </div>
            <div className="text-[10px] text-[#888888] font-semibold uppercase tracking-wider">
              HOA Cost Engine
            </div>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden p-1.5 rounded text-gray-500 hover:bg-gray-100 cursor-pointer"
          title="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Groups - Scrollable */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {TAB_GROUPS.map((group) => (
          <div key={group.groupName}>
            <div className="px-3 pb-1.5 text-[10px] font-bold text-[#888888] uppercase tracking-wider">
              {group.groupName}
            </div>
            <div className="space-y-0.5">
              {group.items.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelect(tab.id)}
                    title={tab.sheetCode}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-[13px] font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[rgba(34,81,255,0.08)] text-[#2251FF] font-semibold'
                        : 'text-[#051C2C] hover:bg-[#F5F5F2] hover:text-[#051C2C]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#2251FF]' : 'text-[#888888]'
                        }`}
                      />
                      <span className="truncate">{tab.label}</span>
                    </div>

                    {/* Badge for Anomaly / Issues */}
                    {tab.id === 'SYS_Validation' && anomalyCount > 0 && (
                      <span className="shrink-0 ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-[#FFEBEE] text-[#D32F2F] font-bold">
                        {anomalyCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Utility Panel & Storage Actions */}
      <div className="p-4 border-t border-[#E5E5E1] bg-white space-y-3 shrink-0">
        {/* Save status badge */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#F5F5F2] text-[11px]">
          <div className="flex items-center gap-1.5 text-gray-500 font-medium">
            {hasUnsavedChanges ? (
              <Clock className="w-3 h-3 text-[#888888] animate-spin" />
            ) : (
              <CheckCircle2 className="w-3 h-3 text-[#00C853]" />
            )}
            <span>Last saved:</span>
          </div>
          <span className="font-bold text-[#051C2C] tabular-nums">{lastSavedText}</span>
        </div>

        {/* Action Button Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenCsvImport}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded border border-gray-200 text-xs font-semibold text-[#051C2C] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            title="Bulk import CSV data"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Bulk CSV</span>
          </button>

          <button
            onClick={onExportBackup}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded border border-gray-200 text-xs font-semibold text-[#051C2C] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            title="Export JSON database backup"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export</span>
          </button>

          <button
            onClick={onImportBackup}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-xs font-semibold text-white transition-opacity cursor-pointer shadow-xs"
            style={{ backgroundColor: 'var(--brand)' }}
            title="Restore from JSON backup"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 border transition-colors cursor-pointer"
            style={{ color: '#D32F2F', borderColor: 'rgba(211,47,47,0.1)' }}
            title="Reset to default HOA template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#E5E5E1] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 rounded text-[#051C2C] hover:bg-gray-100 cursor-pointer"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#051C2C] flex items-center justify-center text-white text-xs font-bold font-display">
              H
            </div>
            <span className="font-display font-bold text-sm text-[#051C2C]">AssetLogic Pro</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCsvImport}
            className="px-2 py-1 text-xs border border-gray-200 rounded font-semibold text-[#051C2C]"
          >
            CSV
          </button>
          <button
            onClick={onExportBackup}
            className="px-2 py-1 text-xs border border-gray-200 rounded font-semibold text-[#051C2C]"
          >
            Backup
          </button>
        </div>
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 bg-white border-r border-[#E5E5E1] sticky top-0 h-screen overflow-hidden">
        {renderNavContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative flex flex-col w-72 max-w-[85vw] bg-white h-full shadow-2xl z-10">
            {renderNavContent()}
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] p-6 max-w-sm w-full shadow-xl border border-gray-200">
            <div className="font-display font-bold text-[18px] text-[#051C2C] mb-2">
              Reset HOA Database?
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
              This will restore all 11 tables (Parameters, Owners, Transactions, and Budget) to standard factory presets. Any unsaved edits will be replaced.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetData();
                }}
                className="px-4 py-2 rounded text-xs font-semibold text-white bg-[#D32F2F] hover:bg-red-700 transition-colors cursor-pointer"
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
