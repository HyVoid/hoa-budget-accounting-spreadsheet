import { AppDatabase, CostMappingRule, OwnerUnit, SystemParameters, Transaction, BudgetRow } from '../types';

export const initialParameters: SystemParameters = {
  currencySymbol: '$',
  activeYear: 2026,
  activeMonth: 9,
  varianceThreshold: 0.10, // 10%
  duplicateDays: 3,
  defaultAllocation: 'SqFt',
};

export const initialCostMapping: CostMappingRule[] = [
  { id: 'cm-1', keyword: 'elevator', category: 'Maintenance & Repairs', subcategory: 'Elevator Service', allocationType: 'SqFt' },
  { id: 'cm-2', keyword: 'otis', category: 'Maintenance & Repairs', subcategory: 'Elevator Service', allocationType: 'SqFt' },
  { id: 'cm-3', keyword: 'landscap', category: 'Grounds & Exterior', subcategory: 'Landscaping Care', allocationType: 'SqFt' },
  { id: 'cm-4', keyword: 'green lawn', category: 'Grounds & Exterior', subcategory: 'Landscaping Care', allocationType: 'SqFt' },
  { id: 'cm-5', keyword: 'water', category: 'Utilities', subcategory: 'Water & Sewer', allocationType: 'SqFt' },
  { id: 'cm-6', keyword: 'power', category: 'Utilities', subcategory: 'Electricity & Gas', allocationType: 'SqFt' },
  { id: 'cm-7', keyword: 'electric', category: 'Utilities', subcategory: 'Electricity & Gas', allocationType: 'SqFt' },
  { id: 'cm-8', keyword: 'patrol', category: 'Safety & Security', subcategory: 'Security Patrol', allocationType: 'Equal' },
  { id: 'cm-9', keyword: 'guard', category: 'Safety & Security', subcategory: 'Security Patrol', allocationType: 'Equal' },
  { id: 'cm-10', keyword: 'trash', category: 'Utilities', subcategory: 'Waste & Recycling', allocationType: 'Equal' },
  { id: 'cm-11', keyword: 'waste', category: 'Utilities', subcategory: 'Waste & Recycling', allocationType: 'Equal' },
  { id: 'cm-12', keyword: 'insurance', category: 'Administrative', subcategory: 'Master Policy Insurance', allocationType: 'SqFt' },
  { id: 'cm-13', keyword: 'travelers', category: 'Administrative', subcategory: 'Master Policy Insurance', allocationType: 'SqFt' },
  { id: 'cm-14', keyword: 'pool', category: 'Amenities', subcategory: 'Pool & Spa Maintenance', allocationType: 'Equal' },
  { id: 'cm-15', keyword: 'aqua', category: 'Amenities', subcategory: 'Pool & Spa Maintenance', allocationType: 'Equal' },
  { id: 'cm-16', keyword: 'legal', category: 'Administrative', subcategory: 'Legal & Accounting', allocationType: 'Equal' },
  { id: 'cm-17', keyword: 'attorney', category: 'Administrative', subcategory: 'Legal & Accounting', allocationType: 'Equal' },
  { id: 'cm-18', keyword: 'management', category: 'Administrative', subcategory: 'Management Fee', allocationType: 'Equal' },
  { id: 'cm-19', keyword: 'apex prop', category: 'Administrative', subcategory: 'Management Fee', allocationType: 'Equal' },
  { id: 'cm-20', keyword: 'plumb', category: 'Maintenance & Repairs', subcategory: 'Plumbing & Drainage', allocationType: 'SqFt' },
  { id: 'cm-21', keyword: 'roof', category: 'Maintenance & Repairs', subcategory: 'Roof & Gutters', allocationType: 'SqFt' },
  { id: 'cm-22', keyword: 'janitor', category: 'Grounds & Exterior', subcategory: 'Janitorial & Cleaning', allocationType: 'Equal' },
];

export const initialOwners: OwnerUnit[] = [
  { id: 'own-1', unitId: 'Unit 101', ownerName: 'Arthur & Claire Pendelton', building: 'North Wing', sqft: 980, customWeight: 1.0, notes: 'Ground floor standard' },
  { id: 'own-2', unitId: 'Unit 102', ownerName: 'David Zhang', building: 'North Wing', sqft: 1150, customWeight: 1.0, notes: 'Corner layout' },
  { id: 'own-3', unitId: 'Unit 103', ownerName: 'Elena Rostova', building: 'North Wing', sqft: 980, customWeight: 1.0, notes: 'Ground floor garden access' },
  { id: 'own-4', unitId: 'Unit 201', ownerName: 'Marcus & Sophia Vance', building: 'North Wing', sqft: 1220, customWeight: 1.0, notes: 'Second level balcony' },
  { id: 'own-5', unitId: 'Unit 202', ownerName: 'Jonathan Bradley', building: 'North Wing', sqft: 1150, customWeight: 1.0, notes: 'Second level standard' },
  { id: 'own-6', unitId: 'Unit 203', ownerName: 'Priya & Raj Patel', building: 'North Wing', sqft: 1220, customWeight: 1.0, notes: 'Second level balcony' },
  { id: 'own-7', unitId: 'Unit 301', ownerName: 'Harrison Ford Estate', building: 'South Wing', sqft: 1380, customWeight: 1.0, notes: 'Third floor corner' },
  { id: 'own-8', unitId: 'Unit 302', ownerName: 'Grace M. Holloway', building: 'South Wing', sqft: 1150, customWeight: 1.0, notes: 'Third floor standard' },
  { id: 'own-9', unitId: 'Unit 303', ownerName: 'Kenji & Aoi Takahashi', building: 'South Wing', sqft: 1380, customWeight: 1.0, notes: 'Third floor corner' },
  { id: 'own-10', unitId: 'Unit 401 (PH)', ownerName: 'Victor & Evelyn Sterling', building: 'South Wing', sqft: 1850, customWeight: 1.0, notes: 'Penthouse west terrace' },
  { id: 'own-11', unitId: 'Unit 402 (PH)', ownerName: 'Dr. Rebecca Montgomery', building: 'South Wing', sqft: 1720, customWeight: 1.0, notes: 'Penthouse central atrium' },
  { id: 'own-12', unitId: 'Unit 403 (PH)', ownerName: 'Liam & Olivia Gallagher', building: 'South Wing', sqft: 1820, customWeight: 1.0, notes: 'Penthouse east terrace' },
];

export const initialBudget: BudgetRow[] = [
  {
    id: 'bgt-1',
    category: 'Utilities',
    subcategory: 'Water & Sewer',
    months: [2400, 2400, 2450, 2500, 2600, 2750, 2900, 2900, 2700, 2500, 2450, 2400],
  },
  {
    id: 'bgt-2',
    category: 'Utilities',
    subcategory: 'Electricity & Gas',
    months: [3200, 3100, 2900, 2700, 2600, 3100, 3400, 3500, 3200, 2800, 3000, 3300],
  },
  {
    id: 'bgt-3',
    category: 'Utilities',
    subcategory: 'Waste & Recycling',
    months: [850, 850, 850, 850, 850, 850, 850, 850, 850, 850, 850, 850],
  },
  {
    id: 'bgt-4',
    category: 'Maintenance & Repairs',
    subcategory: 'Elevator Service',
    months: [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200],
  },
  {
    id: 'bgt-5',
    category: 'Maintenance & Repairs',
    subcategory: 'Plumbing & Drainage',
    months: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
  },
  {
    id: 'bgt-6',
    category: 'Maintenance & Repairs',
    subcategory: 'Roof & Gutters',
    months: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
  },
  {
    id: 'bgt-7',
    category: 'Grounds & Exterior',
    subcategory: 'Landscaping Care',
    months: [1400, 1400, 1600, 1800, 2000, 2100, 2100, 2100, 1900, 1600, 1400, 1400],
  },
  {
    id: 'bgt-8',
    category: 'Grounds & Exterior',
    subcategory: 'Janitorial & Cleaning',
    months: [1100, 1100, 1100, 1100, 1100, 1100, 1100, 1100, 1100, 1100, 1100, 1100],
  },
  {
    id: 'bgt-9',
    category: 'Safety & Security',
    subcategory: 'Security Patrol',
    months: [1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800],
  },
  {
    id: 'bgt-10',
    category: 'Amenities',
    subcategory: 'Pool & Spa Maintenance',
    months: [450, 450, 550, 750, 950, 1100, 1100, 1100, 900, 600, 450, 450],
  },
  {
    id: 'bgt-11',
    category: 'Administrative',
    subcategory: 'Master Policy Insurance',
    months: [2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200, 2200],
  },
  {
    id: 'bgt-12',
    category: 'Administrative',
    subcategory: 'Management Fee',
    months: [1950, 1950, 1950, 1950, 1950, 1950, 1950, 1950, 1950, 1950, 1950, 1950],
  },
  {
    id: 'bgt-13',
    category: 'Administrative',
    subcategory: 'Legal & Accounting',
    months: [700, 700, 700, 700, 700, 700, 700, 700, 700, 700, 700, 700],
  },
];

export const initialTransactions: Transaction[] = [
  // Jan 2026
  { id: 'trx-101', date: '2026-01-05', reference: 'CHK-9021', payee: 'Apex Property Mgmt', rawDescription: 'Monthly HOA management fee service Jan', amount: 1950.00 },
  { id: 'trx-102', date: '2026-01-08', reference: 'EFT-4411', payee: 'Metro City Water Dept', rawDescription: 'Municipal water and sewer main billing Jan', amount: 2380.50 },
  { id: 'trx-103', date: '2026-01-12', reference: 'ACH-8890', payee: 'Con Edison Electric', rawDescription: 'Common area hallway electric & gas utility', amount: 3120.40 },
  { id: 'trx-104', date: '2026-01-15', reference: 'CHK-9022', payee: 'Otis Elevator Co', rawDescription: 'Preventative elevator inspection & hoist test', amount: 1200.00 },
  { id: 'trx-105', date: '2026-01-20', reference: 'CHK-9023', payee: 'Green Lawn & Tree Care', rawDescription: 'Winter landscaping pruning & salt cleanup', amount: 1350.00 },
  { id: 'trx-106', date: '2026-01-28', reference: 'EFT-4412', payee: 'Allied Waste Solutions', rawDescription: 'Dumpster trash and recycling collection', amount: 850.00 },

  // Feb 2026
  { id: 'trx-107', date: '2026-02-04', reference: 'CHK-9030', payee: 'Apex Property Mgmt', rawDescription: 'Monthly management fee Feb', amount: 1950.00 },
  { id: 'trx-108', date: '2026-02-09', reference: 'EFT-4420', payee: 'Metro City Water Dept', rawDescription: 'Water sewer utility bill Feb', amount: 2410.20 },
  { id: 'trx-109', date: '2026-02-14', reference: 'CHK-9031', payee: 'Guardian Night Patrol', rawDescription: 'Community guard night patrol service', amount: 1800.00 },

  // Mar 2026
  { id: 'trx-110', date: '2026-03-05', reference: 'CHK-9040', payee: 'Travelers Commercial', rawDescription: 'Master building insurance policy Q1 installment', amount: 6600.00 },
  { id: 'trx-111', date: '2026-03-12', reference: 'CHK-9042', payee: 'Rapid Plumb & Rooter', rawDescription: 'Emergency basement common pipe plumbing repair', amount: 2450.00 }, // Overrun vs budget

  // Apr 2026
  { id: 'trx-112', date: '2026-04-06', reference: 'CHK-9050', payee: 'Apex Property Mgmt', rawDescription: 'Monthly management fee Apr', amount: 1950.00 },
  { id: 'trx-113', date: '2026-04-15', reference: 'CHK-9051', payee: 'Otis Elevator Co', rawDescription: 'Elevator door interlock sensor replacement', amount: 1650.00 },

  // May 2026
  { id: 'trx-114', date: '2026-05-10', reference: 'EFT-4450', payee: 'Green Lawn & Tree Care', rawDescription: 'Spring landscaping bed mulching & planting', amount: 2150.00 },
  { id: 'trx-115', date: '2026-05-18', reference: 'CHK-9060', payee: 'Aqua Clear Pool Services', rawDescription: 'Summer season pool opening & chlorination', amount: 980.00 },

  // Jun 2026
  { id: 'trx-116', date: '2026-06-05', reference: 'CHK-9070', payee: 'Apex Property Mgmt', rawDescription: 'Monthly management fee Jun', amount: 1950.00 },
  { id: 'trx-117', date: '2026-06-15', reference: 'ACH-8920', payee: 'Con Edison Electric', rawDescription: 'Common area AC electricity peak charge Jun', amount: 3340.00 },

  // Jul 2026
  { id: 'trx-118', date: '2026-07-08', reference: 'CHK-9080', payee: 'Travelers Commercial', rawDescription: 'Insurance master policy Q3 installment', amount: 6600.00 },
  { id: 'trx-119', date: '2026-07-22', reference: 'CHK-9082', payee: 'Aqua Clear Pool Services', rawDescription: 'Pool filter motor pump rebuild', amount: 1450.00 },

  // Aug 2026
  { id: 'trx-120', date: '2026-08-05', reference: 'CHK-9090', payee: 'Apex Property Mgmt', rawDescription: 'Monthly management fee Aug', amount: 1950.00 },
  { id: 'trx-121', date: '2026-08-14', reference: 'EFT-4480', payee: 'Metro City Water Dept', rawDescription: 'City water and sewer consumption Aug', amount: 2980.00 },

  // Sep 2026 (Active month: 9)
  { id: 'trx-122', date: '2026-09-02', reference: 'CHK-9101', payee: 'Apex Property Mgmt', rawDescription: 'Monthly management fee Sep', amount: 1950.00 },
  { id: 'trx-123', date: '2026-09-05', reference: 'EFT-4491', payee: 'Metro City Water Dept', rawDescription: 'Water sewer utility bill Sep', amount: 2780.00 },
  { id: 'trx-124', date: '2026-09-07', reference: 'ACH-8955', payee: 'Con Edison Electric', rawDescription: 'Electric & gas common heating Sep', amount: 3260.00 },
  { id: 'trx-125', date: '2026-09-10', reference: 'CHK-9102', payee: 'Otis Elevator Co', rawDescription: 'Scheduled elevator quarterly inspection', amount: 1200.00 },
  { id: 'trx-126', date: '2026-09-14', reference: 'CHK-9103', payee: 'Green Lawn & Tree Care', rawDescription: 'Fall grounds landscaping maintenance', amount: 1920.00 },
  { id: 'trx-127', date: '2026-09-16', reference: 'CHK-9104', payee: 'Guardian Night Patrol', rawDescription: 'Security patrol contract Sep', amount: 1800.00 },
  { id: 'trx-128', date: '2026-09-18', reference: 'CHK-9105', payee: 'Allied Waste Solutions', rawDescription: 'Trash and recycling dumpster service Sep', amount: 850.00 },
  { id: 'trx-129', date: '2026-09-20', reference: 'CHK-9106', payee: 'Aqua Clear Pool Services', rawDescription: 'Pool & spa end of season winterizing service', amount: 920.00 },
  { id: 'trx-130', date: '2026-09-22', reference: 'CHK-9107', payee: 'Sparkle Clean Janitorial', rawDescription: 'Lobby and corridors janitorial deep wash', amount: 1100.00 },
  { id: 'trx-131', date: '2026-09-24', reference: 'CHK-9108', payee: 'Top Ridge Roofing Inc', rawDescription: 'Gutter clearing and flashing roof sealant check', amount: 850.00 },

  // Intentional anomaly cases for SYS_Validation live demonstration:
  // 1) Duplicate transaction alert: exactly identical payee and amount within 2 days!
  { id: 'trx-132', date: '2026-09-15', reference: 'CHK-9109-DUP', payee: 'Green Lawn & Tree Care', rawDescription: 'Duplicate bill landscaping mulch grounds', amount: 1920.00 },
  // 2) Unmapped classification alert: unknown vendor description not matching dictionary!
  { id: 'trx-133', date: '2026-09-26', reference: 'VND-9910', payee: 'Skyline Drone Surveys', rawDescription: 'Aerial drone thermal envelope leak assessment', amount: 750.00 },
  // 3) Refund / credit line:
  { id: 'trx-134', date: '2026-09-28', reference: 'REF-3301', payee: 'Con Edison Electric', rawDescription: 'Electric tariff overcharge billing rebate credit', amount: -210.00 },
];

export const initialDatabase: AppDatabase = {
  version: 1,
  lastSaved: new Date().toISOString(),
  parameters: initialParameters,
  costMapping: initialCostMapping,
  owners: initialOwners,
  transactions: initialTransactions,
  budget: initialBudget,
};
