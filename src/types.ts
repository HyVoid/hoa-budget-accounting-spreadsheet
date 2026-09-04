export interface SystemParameters {
  currencySymbol: string;      // PAR_Currency_Symbol (e.g. '$')
  activeYear: number;          // PAR_Active_Year (e.g. 2026)
  activeMonth: number;         // PAR_Active_Month (e.g. 9)
  varianceThreshold: number;   // PAR_Variance_Threshold (e.g. 0.10 for 10%)
  duplicateDays: number;       // PAR_Duplicate_Days (e.g. 3)
  defaultAllocation: 'SqFt' | 'Equal' | 'Weight'; // PAR_Default_Allocation
}

export type AllocationMethod = 'SqFt' | 'Equal' | 'Weight' | 'Exclude';

export interface CostMappingRule {
  id: string;
  keyword: string;             // MAP_Keyword
  category: string;            // MAP_Category (Level 1)
  subcategory: string;         // MAP_Subcategory (Level 2)
  allocationType: AllocationMethod; // MAP_Allocation_Type
}

export interface OwnerUnit {
  id: string;
  unitId: string;              // OWN_Unit_ID
  ownerName: string;           // OWN_Name
  building: string;            // Building / Tower
  sqft: number;                // OWN_SqFt
  customWeight: number;        // OWN_Custom_Weight (default 1.0)
  notes?: string;
}

export interface Transaction {
  id: string;
  date: string;                // TRX_Date (YYYY-MM-DD)
  reference: string;           // TRX_Reference
  payee: string;               // TRX_Payee
  rawDescription: string;      // TRX_Raw_Description
  amount: number;              // TRX_Amount (positive = expense, negative = refund)
}

export interface BudgetRow {
  id: string;
  category: string;            // BGT_Category
  subcategory: string;         // BGT_Subcategory
  months: number[];            // 12 months (M01 to M12)
}

export interface CleansedTransaction {
  id: string;
  seq: string;                 // CLN_ID (e.g. TRX-0001)
  stdDate: string;             // CLN_Std_Date
  year: number;                // CLN_Year
  month: number;               // CLN_Month
  reference: string;           // CLN_Reference
  payee: string;               // CLN_Payee
  description: string;         // CLN_Description
  amount: number;              // CLN_Amount
  matchedCategory: string;     // CLN_Matched_Category
  matchedSubcategory: string;  // CLN_Matched_Subcategory
  method: string;              // CLN_Method
  status: 'Matched' | 'Unmatched'; // CLN_Status
  ruleId?: string;
}

export interface UnitAllocationResult {
  unitId: string;
  ownerName: string;
  building: string;
  sqft: number;
  sqftWeight: number;          // ALC_SqFt_Weight (0.0000%)
  equalWeight: number;         // ALC_Equal_Weight (1/N)
  customWeight: number;
  shareSqFt: number;           // ALC_Unit_Share_SqFt
  shareEqual: number;          // ALC_Unit_Share_Equal
  activeMethod: string;        // ALC_Active_Method
  finalAssessment: number;     // ALC_Final_Assessment
}

export interface AnomalyItem {
  id: string;
  trxId: string;
  date: string;
  payee: string;
  amount: number;
  isDuplicate: boolean;
  isUnmapped: boolean;
  isNegative: boolean;
  diagnosis: string;
}

export interface ValidationSummary {
  dupCount: number;
  unmappedCount: number;
  negativeCount: number;
  totalIssues: number;
  systemHealth: 'Healthy' | 'At Risk';
  anomalyRows: AnomalyItem[];
}

export interface MonthlySummaryRow {
  category: string;
  months: number[];            // 12 months actuals
  actualYTD: number;
  actualMTD: number;
  pctTotal: number;
}

export interface BudgetVarianceRow {
  category: string;
  subcategory: string;
  budgetYTD: number;
  actualYTD: number;
  variance: number;            // Actual - Budget
  variancePct: number;         // Variance / Budget
  burnRate: number;            // Actual / Budget
  alertLevel: 'Severe Overrun' | 'Moderate' | 'Surplus';
}

export interface DashboardKPIs {
  totalSpendYTD: number;
  budgetBurnRate: number;
  costPerUnitMTD: number;
  topOverrunCategory: string;
  topOverrunAmount: number;
  activeMonthPool: number;
  totalApprovedBudgetYTD: number;
  totalUnits: number;
  totalSqFt: number;
}

export type SheetTab =
  | 'DASH_Management'
  | 'SYS_Parameters'
  | 'DIM_CostMapping'
  | 'DIM_Owners'
  | 'INP_Transactions'
  | 'INP_Budget'
  | 'ENG_CostCleansing'
  | 'ENG_Allocation'
  | 'SYS_Validation'
  | 'RPT_MonthlySummary'
  | 'RPT_BudgetVariance';

export interface AppDatabase {
  version: number;
  lastSaved: string;
  parameters: SystemParameters;
  costMapping: CostMappingRule[];
  owners: OwnerUnit[];
  transactions: Transaction[];
  budget: BudgetRow[];
}
