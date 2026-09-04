import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  AppDatabase,
  BudgetRow,
  CostMappingRule,
  OwnerUnit,
  SheetTab,
  SystemParameters,
  Transaction,
} from './types';
import { initialDatabase } from './data/initialData';
import {
  calculateAllocations,
  calculateBudgetVariance,
  calculateDashboardKPIs,
  calculateMonthlySummary,
  cleanseTransactions,
  runDataValidation,
} from './utils/engine';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { CsvImportModal } from './components/CsvImportModal';
import { DashboardView } from './components/DashboardView';
import { ParametersView } from './components/ParametersView';
import { CostMappingView } from './components/CostMappingView';
import { OwnersView } from './components/OwnersView';
import { TransactionsView } from './components/TransactionsView';
import { BudgetView } from './components/BudgetView';
import { CostCleansingView } from './components/CostCleansingView';
import { AllocationView } from './components/AllocationView';
import { ValidationView } from './components/ValidationView';
import { MonthlySummaryView } from './components/MonthlySummaryView';
import { BudgetVarianceView } from './components/BudgetVarianceView';

const STORAGE_KEY = 'hoa_cost_engine_db_v1';

export default function App() {
  // Load initial database from localStorage or fallback to preset defaults
  const [db, setDb] = useState<AppDatabase>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.parameters && parsed.transactions && parsed.budget) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse localStorage database, using default seed:', e);
    }
    return initialDatabase;
  });

  const [activeTab, setActiveTab] = useState<SheetTab>('DASH_Management');
  const [lastSavedText, setLastSavedText] = useState<string>('Just now');
  const [isCsvModalOpen, setIsCsvModalOpen] = useState<boolean>(false);
  const importFileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize and auto-save changes to localStorage
  useEffect(() => {
    try {
      const now = new Date();
      const updatedDb: AppDatabase = {
        ...db,
        lastSaved: now.toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDb));
      setLastSavedText(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }
  }, [db]);

  // Reactive pure JavaScript formula engine
  const cleansedTransactions = useMemo(() => {
    return cleanseTransactions(db.transactions, db.costMapping, db.parameters);
  }, [db.transactions, db.costMapping, db.parameters]);

  const validationSummary = useMemo(() => {
    return runDataValidation(cleansedTransactions, db.parameters);
  }, [cleansedTransactions, db.parameters]);

  const allocations = useMemo(() => {
    return calculateAllocations(cleansedTransactions, db.owners, db.parameters);
  }, [cleansedTransactions, db.owners, db.parameters]);

  const monthlySummary = useMemo(() => {
    return calculateMonthlySummary(cleansedTransactions, db.costMapping, db.parameters);
  }, [cleansedTransactions, db.costMapping, db.parameters]);

  const budgetVariance = useMemo(() => {
    return calculateBudgetVariance(db.budget, cleansedTransactions, db.parameters);
  }, [db.budget, cleansedTransactions, db.parameters]);

  const dashboardKpis = useMemo(() => {
    return calculateDashboardKPIs(budgetVariance, allocations, db.parameters);
  }, [budgetVariance, allocations, db.parameters]);

  // Database mutation handlers
  const handleUpdateParameters = (newParams: SystemParameters) => {
    setDb((prev) => ({ ...prev, parameters: newParams }));
  };

  const handleUpdateCostMapping = (newRules: CostMappingRule[]) => {
    setDb((prev) => ({ ...prev, costMapping: newRules }));
  };

  const handleUpdateOwners = (newOwners: OwnerUnit[]) => {
    setDb((prev) => ({ ...prev, owners: newOwners }));
  };

  const handleUpdateTransactions = (newTrx: Transaction[]) => {
    setDb((prev) => ({ ...prev, transactions: newTrx }));
  };

  const handleUpdateBudget = (newBudget: BudgetRow[]) => {
    setDb((prev) => ({ ...prev, budget: newBudget }));
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('download', `HOA_Cost_Engine_Backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportBackupClick = () => {
    importFileInputRef.current?.click();
  };

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.parameters && Array.isArray(json.transactions)) {
          setDb(json);
          alert('Backup restored successfully!');
        } else {
          alert('Invalid backup file format. Expected HOA database schema.');
        }
      } catch (err: any) {
        alert(`Failed to parse backup JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to initial preset
  const handleResetData = () => {
    setDb({
      ...initialDatabase,
      lastSaved: new Date().toISOString(),
    });
    setLastSavedText('Just now');
  };

  // CSV Import handlers
  const handleImportTransactions = (newItems: Transaction[], mode: 'append' | 'replace') => {
    setDb((prev) => ({
      ...prev,
      transactions: mode === 'append' ? [...newItems, ...prev.transactions] : newItems,
    }));
  };

  const handleImportBudget = (newItems: BudgetRow[], mode: 'append' | 'replace') => {
    setDb((prev) => ({
      ...prev,
      budget: mode === 'append' ? [...prev.budget, ...newItems] : newItems,
    }));
  };

  const handleImportOwners = (newItems: OwnerUnit[], mode: 'append' | 'replace') => {
    setDb((prev) => ({
      ...prev,
      owners: mode === 'append' ? [...prev.owners, ...newItems] : newItems,
    }));
  };

  const handleImportCostMapping = (newItems: CostMappingRule[], mode: 'append' | 'replace') => {
    setDb((prev) => ({
      ...prev,
      costMapping: mode === 'append' ? [...newItems, ...prev.costMapping] : newItems,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F5F5F2] text-[#051C2C] font-sans selection:bg-[rgba(34,81,255,0.15)] selection:text-[#2251FF]">
      {/* Hidden File Input for JSON Backup Import */}
      <input
        type="file"
        ref={importFileInputRef}
        accept=".json,application/json"
        onChange={handleImportFileChange}
        className="hidden"
      />

      {/* Responsive Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        lastSavedText={lastSavedText}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackupClick}
        onOpenCsvImport={() => setIsCsvModalOpen(true)}
        onResetData={handleResetData}
        anomalyCount={validationSummary.totalIssues}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-16">
        {activeTab === 'DASH_Management' && (
          <DashboardView
            kpis={dashboardKpis}
            varianceRows={budgetVariance.rows}
            monthlyRows={monthlySummary.rows}
            unitAllocations={allocations.unitResults}
            validation={validationSummary}
            parameters={db.parameters}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'SYS_Parameters' && (
          <ParametersView
            parameters={db.parameters}
            onChange={handleUpdateParameters}
          />
        )}

        {activeTab === 'DIM_CostMapping' && (
          <CostMappingView
            rules={db.costMapping}
            onChange={handleUpdateCostMapping}
          />
        )}

        {activeTab === 'DIM_Owners' && (
          <OwnersView
            owners={db.owners}
            onChange={handleUpdateOwners}
          />
        )}

        {activeTab === 'INP_Transactions' && (
          <TransactionsView
            transactions={db.transactions}
            parameters={db.parameters}
            onChange={handleUpdateTransactions}
          />
        )}

        {activeTab === 'INP_Budget' && (
          <BudgetView
            budget={db.budget}
            parameters={db.parameters}
            onChange={handleUpdateBudget}
          />
        )}

        {activeTab === 'ENG_CostCleansing' && (
          <CostCleansingView
            cleansed={cleansedTransactions}
            parameters={db.parameters}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'ENG_Allocation' && (
          <AllocationView
            allocations={allocations}
            parameters={db.parameters}
            onMethodChange={(method) =>
              handleUpdateParameters({ ...db.parameters, defaultAllocation: method })
            }
          />
        )}

        {activeTab === 'SYS_Validation' && (
          <ValidationView
            validation={validationSummary}
            parameters={db.parameters}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'RPT_MonthlySummary' && (
          <MonthlySummaryView
            summary={monthlySummary}
            parameters={db.parameters}
          />
        )}

        {activeTab === 'RPT_BudgetVariance' && (
          <BudgetVarianceView
            varianceData={budgetVariance}
            parameters={db.parameters}
          />
        )}
      </main>

      {/* Privacy Notice Footer */}
      <Footer />
      </div>

      {/* Bulk CSV Import Modal */}
      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImportTransactions={handleImportTransactions}
        onImportBudget={handleImportBudget}
        onImportOwners={handleImportOwners}
        onImportCostMapping={handleImportCostMapping}
      />
    </div>
  );
}
