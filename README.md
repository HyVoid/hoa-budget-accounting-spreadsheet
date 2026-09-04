# HOA Cost Allocation & Budget Tracking Spreadsheet Template

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)
![Tool Type](https://img.shields.io/badge/Tool-Type-Decision%20Support-success.svg)

**A lightweight HOA accounting software alternative and property management spreadsheet template designed for homeowners associations. Turn raw bank transactions into categorized expenses, accurate owner fee assessments, and board-ready budget vs. actual variance reports—with no monthly subscriptions, zero installation, and seamless access via browser or Excel.**

> **Try the free web-based version to audit your community finances today. If you need the offline version for permanent reserve fund records, vendor audit trails, and repeated monthly use, you can upgrade with a 30-day, no-questions-asked money-back guarantee.**
>
> [🌐 Open Free Web-Based HOA Budget Tracker] → [HTML live version](https://hyvoid.github.io/hoa-budget-accounting-spreadsheet/)
> 
> [📥 Download Reusable HOA Financial Excel Template] → Excel version

## HOA Financial Pain Points & Automated Solutions

Instead of reviewing an unstructured bank ledger, this HOA expense tracking tool maps common property management bottlenecks to automated reporting solutions:

* **Pain Point: Messy Bank Exports & Uncategorized Spend.** 
  **Solution:** Automatically maps unstructured raw vendor payments into a standardized operating budget and reserve fund cost category taxonomy.
* **Pain Point: Unpredictable Maintenance Overruns.** 
  **Solution:** Generates real-time **Budget vs. Actual performance dashboards**, including cumulative variance, budget burn rate, and visual flags for the largest financial exposures.
* **Pain Point: Calculating Complex HOA Dues & Special Assessments.** 
  **Solution:** Translates common property expenses into accurate, owner-level assessments using square-footage, equal-share, or custom weighted allocation calculators.
* **Pain Point: Hidden Errors in Accounts Payable.** 
  **Solution:** Creates an automated audit trail that flags potential duplicate vendor invoices, negative reversal entries, and unmapped general ledger (GL) transactions.
* **Pain Point: Confusing Board Meetings.** 
  **Solution:** Translates raw data into a management-level financial summary, highlighting YTD operating spend, average cost per residential unit, and leading overrun categories for quick board approvals.

## Quick Start Tutorial: Automate Your HOA Monthly Close

### Step 1: Configure HOA Fiscal Year & Reserve Parameters
Set your core financial foundation. Define the active fiscal year, reporting month, currency, and budget variance warning thresholds. Configure your duplicate-payment detection window and default owner fee allocation method (e.g., square footage vs. flat fee). These global variables are set once in the control panel to ensure consistent accounts payable reporting.

### Step 2: Import General Ledger & Vendor Invoices
Copy your property's existing financial data and paste it directly into the transaction input tab. The workflow is optimized for standard property management exports: bank statements, vendor payment logs, utility invoices, and property maintenance receipts. Input your approved annual operating budget and residential unit registry in their respective tables. *No complex database integration or manual formula adjustments required.*

### Step 3: Generate Board-Ready Financial Dashboards
Navigate to the automated reporting views. The engine instantly processes your raw inputs into actionable financial intelligence: standardized date formats, sorted cost centers, applied assessment allocations, and high-contrast budget variance alerts. Review the YTD summary before your next board meeting.

### Step 4: Download for Permanent Record & Repeated Use
Once you have validated your current month's expenses in the web application, transition to a sustainable monthly close process. 

**Ready to standardize your community's financial reporting? [📥 Download the permanent HOA Budget Excel Template] to secure your offline audit trails, retain historical general ledgers, and repeat this streamlined workflow every month without starting from scratch.**

## Standard Accounting vs. Automated HOA Spreadsheet

| Common HOA Financial Management Bottlenecks | Standard Manual Accounting (Without Tool) | Automated HOA Spreadsheet Solution (With Tool) |
| :--- | :--- | :--- |
| **General Ledger (GL) Categorization** | Bank and vendor invoice descriptions require line-by-line manual interpretation and data entry. | A maintained keyword mapping structure automatically converts recurring payees into standardized operating/reserve cost categories. |
| **Operating Budget Variance Tracking** | Board members discover maintenance overruns only after quarterly cash reserves are depleted. | Budget vs. actual spending is aligned by category, with automated alert thresholds surfacing financial risks immediately. |
| **Accounts Payable & Vendor Audits** | Duplicate vendor payments slip through when manually scanning thousands of rows in a basic spreadsheet. | Algorithmic checks surface same-payee, same-amount transactions within a custom date window as potential duplicate invoices. |
| **Special Assessment & Dues Calculation** | Splitting shared community costs across varying unit sizes causes calculation errors and owner disputes. | Automated cost pools instantly translate into unit-level assessments using square-footage or custom weighting logic. |
| **Reconciliation of Refunds & Reversals** | Bank reversals and refunded deposits distort the true operating expense analysis. | Negative transactions and vendor credits are automatically quarantined as exceptions requiring treasurer verification. |
| **Board Member Decision Fatigue** | Treasurers must synthesize multiple disparate Excel tabs to present the financial health of the community. | A consolidated management view isolates total cash burn, budget consumption %, cost per unit, and priority overruns. |

## Ideal Use Cases: Who Uses This HOA Management Template?

This engine is engineered for professionals and volunteers who need rigorous financial oversight without the bloat and cost of enterprise property management software (like AppFolio or Buildium). 

* **Self-Managed HOA Board Treasurers:** Perfect for volunteer board members who need a reliable *HOA treasurer spreadsheet template* to prepare transparent, easy-to-explain financial packets for annual general meetings.
* **Independent Property Managers:** Ideal for operators managing a portfolio of 5-15 smaller residential associations, requiring a standardized *property management budget excel template* to scale their monthly reporting across different properties.
* **Community Finance Administrators:** Essential for accounting clerks tasked with reconciling *HOA operating budgets* and calculating precise *special assessments* based on complex neighborhood covenants.

*(Note: The tested operational capacity of this template handles approximately 50,000 transaction rows per fiscal year and accommodates up to 2,000 owner units. For massive multi-phase developments, a dedicated SQL database or full ERP architecture is recommended.)*

## Resolving Complex Community Finances: Targeted Scenarios

Whether you are navigating a sudden infrastructure crisis or planning long-term community health, this tool adapts to specific high-stakes financial scenarios:
* **Navigating Unexpected Roof or Road Repairs:** When a massive unbudgeted expense occurs, use the allocation engine to immediately project how the cost will impact individual *monthly HOA fees* versus drawing from the *capital reserve fund*.
* **Transitioning from Developer to Homeowner Control:** Newly handed-over HOAs often inherit messy, unstructured financial logs. The keyword mapping feature acts as a *general ledger cleanup tool*, rapidly organizing historical developer spending into a baseline homeowner budget.
* **Conducting End-of-Year Vendor Audits:** Before renewing landscaping, pool maintenance, or property management contracts, leverage the categorized spend reports to negotiate better rates based on exact historical consumption.

## Why I Built This Productized Framework

HOA financial review often fails for a simple reason: the numbers exist, but they are not organized around the decisions the board actually needs to make. 

A standard bank statement proves a payment cleared. It does not prove if the vendor was classified correctly, if the invoice was a duplicate, or if that specific utility category is draining the annual budget. This creates a recurring failure pattern where boards approve budgets based on total cash balances rather than category-level performance. 

I built this tracker to bridge that exact gap. It operates as a **productized reasoning framework**—progressively converting raw financial activity into classification, validation, variance analysis, assessment allocation, and ultimately, confident management decisions. 

> **What information needs to be in one place to make the next decision confidently?** 
> 
> *Start tracking today to find out.*

---

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

### Workbook Architecture

The workbook follows a deliberately one-directional architecture:

```text
Configuration & Master Data
        │
        ├── SYS_Parameters
        ├── DIM_CostMapping
        └── DIM_Owners
                │
                ▼
Raw Input
        │
        ├── INP_Transactions
        └── INP_Budget
                │
                ▼
Calculation & Validation
        │
        ├── ENG_CostCleansing
        ├── ENG_Allocation
        └── SYS_Validation
                │
                ▼
Reporting
        │
        ├── RPT_MonthlySummary
        └── RPT_BudgetVariance
                │
                ▼
Management Output
        │
        └── DASH_Management
```

The implementation uses **11 worksheet components across five logical layers**, with configuration and master data separated from raw inputs, calculation engines, reports, and management presentation.

| Layer         | Sheet                | Primary Role                                                                        |
| ------------- | -------------------- | ----------------------------------------------------------------------------------- |
| Configuration | `SYS_Parameters`     | Central control of year, month, currency, thresholds, and default allocation method |
| Master Data   | `DIM_CostMapping`    | Cost-category hierarchy and keyword mapping rules                                   |
| Master Data   | `DIM_Owners`         | Unit, owner, square-footage, and allocation-weight data                             |
| Input         | `INP_Transactions`   | Bank, invoice, reimbursement, and maintenance-payment transactions                  |
| Input         | `INP_Budget`         | Approved monthly and annual budget                                                  |
| Calculation   | `ENG_CostCleansing`  | Standardization and automated transaction classification                            |
| Calculation   | `ENG_Allocation`     | Owner-level cost allocation                                                         |
| Validation    | `SYS_Validation`     | Duplicate, unmapped, negative, and anomaly checks                                   |
| Reporting     | `RPT_MonthlySummary` | Monthly and YTD cost analysis                                                       |
| Reporting     | `RPT_BudgetVariance` | Budget vs. actual variance and alert analysis                                       |
| Management    | `DASH_Management`    | Board-level KPI and exception view                                                  |

The intended dependency direction is:

```text
Input → Cleansing → Validation
              ├──→ Monthly Reporting
              └──→ Allocation
Budget ───────────→ Variance Reporting
Parameters ───────→ Calculation & Reporting Controls
Reporting ────────→ Management Dashboard
```

The model therefore avoids using the management dashboard as an independent calculation layer. Dashboard metrics are downstream outputs of the reporting and allocation logic.

### Three Traps That Catch Even Experienced HOA Finance Practitioners

#### Trap 1 — Total Spending Looks Fine, but One Category Is Already Bleeding

**Decision:** The board reviews YTD HOA expenditure and decides that spending is generally under control.

**Faulty number:** Total spending alone hides category-level variance.

**Wrong conclusion:** If total expenditure is below the aggregate budget, no immediate intervention is required.

**Correct approach:** Compare actual spending against budget at the cost-category level and rank the resulting variance.

| View                | Result                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Aggregate spend     | Appears acceptable                                                                        |
| Category variance   | One maintenance category materially exceeds plan                                          |
| Management response | Investigate the specific cost driver rather than judging the entire budget from one total |

The workbook's variance engine calculates both the absolute variance and percentage variance, then assigns an alert state based on the configured threshold. Positive variance represents spending above budget; negative variance represents remaining budget capacity.

<details>
<summary>Formula Reference — Budget Variance</summary>

```excel
variance = actual_ytd - budget_ytd

variance_pct =
IF(
    budget_ytd=0,
    IF(actual_ytd>0, 1, 0),
    variance / budget_ytd
)

burn_rate =
IF(
    budget_ytd=0,
    0,
    actual_ytd / budget_ytd
)
```

The alert logic uses the configured warning threshold:

```excel
IF(
    variance_pct > warning_threshold,
    "🔴 Severe Overrun",
    IF(
        variance_pct > 0,
        "🟡 Slight Overrun",
        "🟢 Within Budget"
    )
)
```

</details>

#### Trap 2 — A Shared Cost Is Treated as Automatically Equal

**Decision:** A common HOA expense is divided equally across all units.

**Faulty assumption:** Every unit carries the same economic allocation basis.

**Wrong conclusion:** Equal division is inherently neutral and transparent.

**Correct approach:** Maintain parallel allocation views so the applicable policy can be evaluated against the actual unit characteristics.

The engine supports square-footage allocation, equal allocation, and configurable weighting. This makes the allocation mechanism visible rather than burying it inside a manually maintained calculation.

| Approach       | Basis                        | Management Question                                       |
| -------------- | ---------------------------- | --------------------------------------------------------- |
| Square footage | Unit area / total area       | Does the governing allocation policy use property size?   |
| Equal          | 1 / number of units          | Is the expense intended to be shared equally?             |
| Weight         | Configured owner/unit factor | Are specific units subject to an adjusted weighting rule? |

<details>
<summary>Formula Reference — Allocation Logic</summary>

```excel
share_sqft = ROUND(pool * sqft_weight, 2)

share_equal = ROUND(pool * equal_weight, 2)

final_assessment =
IF(
    default_method="Equal",
    share_equal,
    share_sqft
)
```

The workbook also exposes both allocation calculations simultaneously, allowing the active method to be compared against the alternative rather than making the alternative invisible.

</details>

#### Trap 3 — A Clean-Looking Ledger Is Assumed to Be a Clean Ledger

**Decision:** The reporting schedule is accepted because the transaction totals reconcile visually.

**Faulty assumption:** If transactions are present, they are correctly classified and unique.

**Wrong conclusion:** No additional review is required.

**Correct approach:** Separate financial aggregation from data-quality validation.

The validation layer explicitly looks for:

* suspected duplicate payments;
* transactions that could not be mapped to a cost category;
* negative or reversal transactions;
* anomalous records requiring review.

This matters because a transaction can be financially present while still being analytically unreliable.

<details>
<summary>Formula Reference — Validation Logic</summary>

```excel
match_cnt =
COUNTIFS(
    payees, current_payee,
    amounts, current_amount,
    dates, ">=" & (current_date - duplicate_days),
    dates, "<=" & (current_date + duplicate_days)
)

is_duplicate = match_cnt > 1

is_unmapped = current_category = "Unmapped"

is_negative = current_amount < 0
```

The resulting diagnostic table filters the source population down to records requiring investigation rather than forcing reviewers to manually scan the entire transaction history.

</details>

### Example Scenario

Consider an HOA reviewing September 2026 expenditure with the active reporting month set to September.

The transaction layer contains recurring vendor payments, maintenance expenses, and other community operating costs. The model first standardizes transaction dates and references, then maps transaction descriptions against the maintained cost-category dictionary.

Suppose the resulting YTD reporting identifies a maintenance subcategory with an approved YTD budget of **$42,000** and actual expenditure of **$47,250**.

The resulting variance is:

```text
Actual YTD     $47,250
Budget YTD     $42,000
Variance        $5,250
Variance %      12.50%
```

With a warning threshold of **10%**, the category is classified as a severe overrun.

The useful conclusion is not simply that "$5,250 was overspent." The board can now ask the narrower operational question: **What caused this category to exceed plan, and is the excess temporary or structural?**

At the same time, suppose September's total eligible common-cost pool is **$18,000** and the association contains **60 units**.

Under an equal allocation:

```text
$18,000 / 60 = $300 per unit
```

If the governing allocation basis instead uses square footage, each unit receives an assessment according to its share of total registered area. The two approaches can therefore produce materially different owner-level obligations even though the underlying HOA cost pool remains unchanged.

The management implication is straightforward:

1. investigate the category generating the budget overrun;
2. determine whether the variance is a one-time event or a recurring cost trend;
3. verify the applicable allocation basis before communicating owner-level charges;
4. review any duplicate, unmapped, or reversal transactions before treating the reported figures as final.

The model is designed to make these questions visible in sequence rather than requiring the board to reconstruct them manually from raw transactions.

### Formula Reference

The workbook relies on Excel 365 dynamic-array functions to keep calculation areas synchronized with growing transaction and owner datasets. The formulas are intentionally separated by responsibility: source synchronization, classification, allocation, validation, aggregation, and variance analysis.

<details>
<summary>ENG_CostCleansing — Transaction Synchronization</summary>

**Purpose:** Pull non-empty transaction records from `INP_Transactions`, standardize the date dimensions, and generate a system-level transaction ID.

```excel
=LET(
    raw_date, FILTER(INP_Transactions!A4:A10000, INP_Transactions!A4:A10000<>""),
    raw_ref, FILTER(INP_Transactions!B4:B10000, INP_Transactions!A4:A10000<>""),
    raw_payee, FILTER(INP_Transactions!C4:C10000, INP_Transactions!A4:A10000<>""),
    raw_desc, FILTER(INP_Transactions!D4:D10000, INP_Transactions!A4:A10000<>""),
    raw_amt, FILTER(INP_Transactions!E4:E10000, INP_Transactions!A4:A10000<>""),
    n, ROWS(raw_date),
    seq, "TRX-" & TEXT(SEQUENCE(n), "0000"),
    yr, YEAR(raw_date),
    mo, MONTH(raw_date),
    HSTACK(seq, raw_date, yr, mo, raw_ref, raw_payee, raw_desc, raw_amt)
)
```

**Key logic:**

* `FILTER` removes unused transaction rows.
* `SEQUENCE` generates a contiguous audit ID.
* `YEAR` and `MONTH` create reporting dimensions.
* `HSTACK` assembles the standardized calculation array.

The calculation begins at `A4` and spills through the populated transaction population. 

</details>

<details>
<summary>ENG_CostCleansing — Automated Cost Classification</summary>

**Purpose:** Match transaction descriptions against the maintained keyword dictionary and return both the primary and secondary cost category.

```excel
=LET(
    desc_list, INDEX(A4#, , 7),
    kw_range, FILTER(DIM_CostMapping!$B$4:$B$500, DIM_CostMapping!$B$4:$B$500<>""),
    cat_range, FILTER(DIM_CostMapping!$C$4:$C$500, DIM_CostMapping!$B$4:$B$500<>""),
    subcat_range, FILTER(DIM_CostMapping!$D$4:$D$500, DIM_CostMapping!$B$4:$B$500<>""),
    BYROW(desc_list, LAMBDA(d,
        LET(
            match_pos,
            XLOOKUP(
                TRUE,
                ISNUMBER(SEARCH(kw_range, d)),
                SEQUENCE(ROWS(kw_range)),
                0
            ),
            IF(
                match_pos=0,
                HSTACK("待分类(Unmapped)", "待指定明细"),
                HSTACK(
                    INDEX(cat_range, match_pos),
                    INDEX(subcat_range, match_pos)
                )
            )
        )
    ))
)
```

The important design decision is that an unsuccessful match does **not** disappear from the calculation. It becomes an explicit `Unmapped` state and can subsequently be surfaced by the validation layer. 

</details>

<details>
<summary>ENG_CostCleansing — Allocation Method & Classification Status</summary>

**Purpose:** Bind the matched transaction to its applicable allocation method while explicitly distinguishing successfully classified transactions from those requiring manual review.

```excel
=LET(
    desc_list, INDEX(A4#, , 7),
    cat_matched, INDEX(I4#, , 1),
    kw_range, FILTER(DIM_CostMapping!$B$4:$B$500, DIM_CostMapping!$B$4:$B$500<>""),
    alloc_range, FILTER(DIM_CostMapping!$E$4:$E$500, DIM_CostMapping!$B$4:$B$500<>""),
    default_alloc, SYS_Parameters!$C$9,
    BYROW(desc_list, LAMBDA(d,
        LET(
            match_pos,
            XLOOKUP(
                TRUE,
                ISNUMBER(SEARCH(kw_range, d)),
                SEQUENCE(ROWS(kw_range)),
                0
            ),
            method,
            IF(match_pos=0, default_alloc, INDEX(alloc_range, match_pos)),
            status,
            IF(
                INDEX(
                    cat_matched,
                    ROW(d)-ROW(INDEX(desc_list,1))+1
                )="待分类(Unmapped)",
                "⚠️ 待人工确认",
                "✅ 已匹配"
            ),
            HSTACK(method, status)
        )
    ))
)
```

This creates the routing signal consumed by the allocation engine and the exception state consumed by validation. 

</details>

<details>
<summary>ENG_Allocation — Common-Cost Pool</summary>

**Purpose:** Extract the active reporting period from the cleaned transaction population and calculate the total amount available for allocation.

```excel
=LET(
    act_yr, SYS_Parameters!$C$5,
    act_mo, SYS_Parameters!$C$6,
    cln_yrs, INDEX(ENG_CostCleansing!A4#, , 3),
    cln_mos, INDEX(ENG_CostCleansing!A4#, , 4),
    cln_amts, INDEX(ENG_CostCleansing!A4#, , 8),
    SUM(
        FILTER(
            cln_amts,
            (cln_yrs=act_yr)*(cln_mos=act_mo),
            0
        )
    )
)
```

The reporting period is therefore controlled centrally rather than embedded in the allocation formula.

</details>

<details>
<summary>ENG_Allocation — Unit-Level Allocation</summary>

**Purpose:** Calculate square-footage and equal-share assessments in parallel, then select the active allocation method.

```excel
=LET(
    pool, $C$4,
    u_id, FILTER(DIM_Owners!A4:A500, DIM_Owners!A4:A500<>""),
    u_name, FILTER(DIM_Owners!B4:B500, DIM_Owners!A4:A500<>""),
    u_sqft, FILTER(DIM_Owners!D4:D500, DIM_Owners!A4:A500<>""),
    w_sqft, FILTER(DIM_Owners!F4:F500, DIM_Owners!A4:A500<>""),
    w_eq, FILTER(DIM_Owners!G4:G500, DIM_Owners!A4:A500<>""),
    def_method, SYS_Parameters!$C$9,

    share_sqft, ROUND(pool*w_sqft,2),
    share_eq, ROUND(pool*w_eq,2),

    final_val,
    IF(def_method="Equal",share_eq,share_sqft),

    HSTACK(
        u_id,
        u_name,
        u_sqft,
        w_sqft,
        w_eq,
        share_sqft,
        share_eq,
        def_method,
        final_val
    )
)
```

Both major allocation scenarios remain visible. This is important for governance because the final assessment is not the only relevant number; the underlying allocation basis must also remain auditable. 

</details>

<details>
<summary>SYS_Validation — Exception Detection</summary>

**Purpose:** Detect duplicate-looking transactions, unmapped classifications, and negative/reversal transactions.

```excel
match_cnt =
COUNTIFS(
    payees, cur_p,
    amts, cur_a,
    dates, ">=" & (cur_d-dup_days),
    dates, "<=" & (cur_d+dup_days)
)

is_dup = match_cnt > 1
is_unmap = cur_c = "待分类(Unmapped)"
is_neg = cur_a < 0
```

The configured duplicate window comes from `SYS_Parameters!$C$8`, so the control period can be changed without rewriting the validation formula. 

</details>

<details>
<summary>RPT_MonthlySummary — Twelve-Month Cost Matrix</summary>

**Purpose:** Generate a category-by-month expenditure matrix for the active fiscal year.

```excel
=LET(
    cats, DIM_CostMapping!G4#,
    act_yr, SYS_Parameters!$C$5,
    cln_yr, INDEX(ENG_CostCleansing!A4#, , 3),
    cln_mo, INDEX(ENG_CostCleansing!A4#, , 4),
    cln_cat, INDEX(ENG_CostCleansing!A4#, , 9),
    cln_amt, INDEX(ENG_CostCleansing!A4#, , 8),

    month_matrix,
    MAKEARRAY(
        ROWS(cats),
        12,
        LAMBDA(r,c,
            LET(
                cur_cat, INDEX(cats,r),
                SUM(
                    FILTER(
                        cln_amt,
                        (cln_yr=act_yr)*
                        (cln_mo=c)*
                        (cln_cat=cur_cat),
                        0
                    )
                )
            )
        )
    ),

    HSTACK(cats,month_matrix)
)
```

The matrix replaces repetitive month-by-month calculation blocks with one dynamic calculation structure. 

</details>

<details>
<summary>RPT_MonthlySummary — YTD, MTD and Cost Mix</summary>

```excel
=LET(
    data_matrix,
    CHOOSECOLS(
        A4#,
        2,3,4,5,6,7,8,9,10,11,12,13
    ),
    act_mo, SYS_Parameters!$C$6,

    ytd_col,
    BYROW(data_matrix,LAMBDA(row,SUM(row))),

    mtd_col,
    INDEX(data_matrix,,act_mo),

    total_ytd,
    SUM(ytd_col),

    pct_col,
    IF(total_ytd=0,0,ytd_col/total_ytd),

    HSTACK(ytd_col,mtd_col,pct_col)
)
```

This gives management three different views of the same cost category:

* total annual consumption to date;
* current-month expenditure;
* contribution to total YTD spending.

</details>

<details>
<summary>RPT_BudgetVariance — Budget vs. Actual</summary>

The core calculations are:

```excel
variance = actual_ytd - budget_ytd

variance_pct =
IF(
    budget_ytd=0,
    IF(actual_ytd>0,1,0),
    variance/budget_ytd
)

burn_rate =
IF(
    budget_ytd=0,
    0,
    actual_ytd/budget_ytd
)
```

Alert classification:

```excel
IF(
    var_pct>warn_th,
    "🔴 严重超支",
    IF(
        var_pct>0,
        "🟡 略微超支",
        "🟢 预算结余"
    )
)
```

The complete variance calculation is sorted by absolute overrun so the largest problem categories appear first.  

</details>

<details>
<summary>DASH_Management — Management Output</summary>

The dashboard consumes downstream reporting outputs rather than independently recreating the financial model.

A representative Top-5 overrun extraction is:

```excel
=LET(
    var_data,RPT_BudgetVariance!A4#,
    headers,
    HSTACK(
        "成本科目",
        "累计预算",
        "实际发生",
        "超支差额",
        "偏差率"
    ),
    top_rows,
    CHOOSEROWS(
        CHOOSECOLS(
            var_data,
            2,3,4,5,6
        ),
        SEQUENCE(5)
    ),
    VSTACK(headers,top_rows)
)
```

The management layer therefore answers the operational question **“Where should the board look first?”** rather than creating another independent source of financial numbers. 

</details>

### Validation Rules

Validation is designed as a separate control layer rather than embedding all error handling inside reporting formulas.

| Field / Area          | Rule                                                                                            | Error Behavior                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Transaction date      | Must contain a valid date value                                                                 | Invalid or unusable records should be corrected before relying on period analysis |
| Transaction reference | Should identify the source payment or bank record                                               | Missing references weaken audit traceability                                      |
| Payee                 | Should contain the supplier / payment counterparty                                              | Missing payee information reduces duplicate-payment detection quality             |
| Transaction amount    | Positive values represent expenditure; negative values represent refunds, reversals, or credits | Negative transactions are explicitly flagged for review                           |
| Cost classification   | Every transaction should resolve to a configured category                                       | Unmatched records become `待分类(Unmapped)` and require manual confirmation          |
| Mapping keyword       | Must correspond to a meaningful transaction-description pattern                                 | Poor keywords can create false matches or leave valid transactions unmapped       |
| Allocation method     | Must correspond to a supported configured method                                                | Missing method falls back to the system default where defined                     |
| Owner / Unit ID       | Should be unique within the owner master                                                        | Duplicate unit identifiers can distort allocation results                         |
| Square footage        | Required for square-footage allocation                                                          | Missing or invalid area data compromises the area-based allocation                |
| Allocation weights    | Should form the intended allocation basis                                                       | Weight inconsistencies should be reviewed before owner-level billing              |
| Duplicate detection   | Same payee + same amount within the configured date window is treated as suspicious             | Flagged as potential duplicate; not automatically treated as fraud                |
| Budget value          | Must be available for meaningful variance analysis                                              | Zero-budget categories require special interpretation                             |
| Variance threshold    | Controlled centrally through `PAR_Variance_Threshold`                                           | Changes alert sensitivity without modifying formulas                              |
| Spill ranges          | Calculation cells must remain unobstructed                                                      | Manual entries inside spill paths can trigger `#SPILL!`                           |
| Calculation mode      | Workbook should use automatic calculation                                                       | Manual mode can prevent parameter changes from immediately propagating            |
| Formula cells         | Calculation areas are protected from manual entry                                               | Manual edits can break downstream calculations                                    |

The model's validation layer is explicitly intended to identify records for investigation; a duplicate flag, for example, indicates a **potential duplicate**, not proof that a payment is erroneous.

### Cross-Model Integrity Check

The architecture was designed with explicit input-to-output traceability.

| Control                    | Source               | Consumer                                 | Status      |
| -------------------------- | -------------------- | ---------------------------------------- | ----------- |
| Active year                | `SYS_Parameters!C5`  | Cleansing, allocation, monthly reporting | Closed loop |
| Active month               | `SYS_Parameters!C6`  | Allocation, variance analysis, dashboard | Closed loop |
| Variance threshold         | `SYS_Parameters!C7`  | Budget variance alerts                   | Closed loop |
| Duplicate window           | `SYS_Parameters!C8`  | Validation engine                        | Closed loop |
| Default allocation         | `SYS_Parameters!C9`  | Cleansing and allocation                 | Closed loop |
| Cost mapping dictionary    | `DIM_CostMapping`    | Cleansing engine                         | Closed loop |
| Owner master               | `DIM_Owners`         | Allocation engine                        | Closed loop |
| Transaction input          | `INP_Transactions`   | Cleansing engine                         | Closed loop |
| Budget input               | `INP_Budget`         | Budget variance engine                   | Closed loop |
| Cleaned transaction output | `ENG_CostCleansing`  | Allocation, validation, reporting        | Closed loop |
| Allocation output          | `ENG_Allocation`     | Dashboard / owner assessment             | Closed loop |
| Validation output          | `SYS_Validation`     | Health indicator / audit detail          | Closed loop |
| Monthly reporting output   | `RPT_MonthlySummary` | Management analysis                      | Closed loop |
| Variance output            | `RPT_BudgetVariance` | Dashboard / Top-5 overrun analysis       | Closed loop |

The source implementation explicitly records these input and output dependencies as having passed the cross-check. 

### Operational SOP

The intended monthly operating cycle is deliberately short:

```text
Update Parameters
       ↓
Paste Transactions
       ↓
Run Validation
       ↓
Maintain Mapping Rules
       ↓
Review Dashboard & Allocation Output
```

1. **Update the reporting period.**
   Change the active month in `SYS_Parameters`.

2. **Append the latest transactions.**
   Add the latest bank or payment records to the transaction input area. Expenditure remains positive; refunds or reversals remain negative.

3. **Review validation.**
   Check the system health indicator and investigate the exception table before treating the reporting output as final.

4. **Maintain classification rules.**
   If recurring transactions appear as `Unmapped`, add the appropriate keyword and category mapping to the master dictionary.

5. **Issue management output.**
   Review the dashboard and variance report. Where required, use the allocation output for owner-level assessment or statement preparation.  

### Maintenance & Operating Boundaries

The workbook is designed for **Microsoft 365 or Excel 2021+** because its calculation engine depends on modern dynamic-array functionality. Older versions such as Office 2016 may produce `#NAME?` errors. 

The recommended operating envelope is:

* up to approximately **50,000 transaction rows per year**;
* up to approximately **2,000 owner units**;
* centralized maintenance of mapping and owner master data;
* automatic calculation mode enabled;
* no manual entries inside formula spill ranges.

For larger datasets or materially higher concurrency, the source architecture recommends moving the calculation workload toward a dedicated financial database or ERP environment rather than forcing Excel beyond its intended operating range. 

### Troubleshooting

**`#SPILL!` appears in a calculation area**

The most common cause is a manually entered value, space, or other content blocking the intended spill range. Clear the obstructing cells and allow the dynamic-array formula to expand. 

**Changing the reporting month does not update the dashboard**

Check Excel's calculation mode. If it is set to **Manual**, switch it to **Automatic**, or force a recalculation with `F9`. 

**A transaction remains unmapped**

Review the transaction description against `DIM_CostMapping`. Add a sufficiently specific keyword and corresponding category/subcategory rather than manually overriding the calculated output.

**A transaction is flagged as a duplicate**

Treat the flag as an investigation signal. Confirm the reference number, date, payee, amount, and supporting payment record before deciding whether the transaction is actually duplicated.

**Owner assessments appear inconsistent**

First verify the owner master, square footage, allocation weights, and active allocation method. The allocation engine depends directly on these master-data inputs.

### Technical Boundary

This workbook is a **decision-support and operational control layer**, not a statutory accounting system.

It is intended to improve the path from:

```text
Raw Financial Activity
        ↓
Classification
        ↓
Validation
        ↓
Budget / Actual Analysis
        ↓
Allocation
        ↓
Management Decision
```

It does not eliminate the need for appropriate accounting review, source-document retention, HOA governing-document requirements, or professional judgment regarding the legally applicable assessment methodology.

</details>


---


## The Business Logic & Methodology

The model is built around a simple commercial principle: **the useful number is not necessarily the first number available.** HOA management needs a controlled path from payment activity to a defensible decision.

* **Cost classification** turns inconsistent transaction descriptions into a consistent cost view. This solves the problem of comparing unlike expenses and makes recurring cost drivers easier to identify.
* **Variance analysis** compares planned spending with actual spending through the current reporting period. This makes budget pressure visible while there is still time to investigate or adjust it.
* **Threshold alerting** separates ordinary variance from items that deserve management attention. The result is less time spent scanning every line and more attention on material exceptions.
* **Multi-method allocation** shows how the same common-cost pool changes when the allocation basis changes. This makes owner-level assessments easier to explain and review.
* **Exception-based validation** treats unmapped, duplicate-looking, and reversal transactions as review items before they contaminate management conclusions.

The methodology therefore moves the workflow from **“What did we pay?”** toward **“What did we pay, where does it belong, is the number reliable, how does it compare with plan, and what does it mean for each unit?”**

### End-to-End Control Logic

```text
Source Transactions
        │
        ▼
Standardized Cost View
        │
        ├──────────────► Validation / Exceptions
        │
        ▼
Monthly & YTD Cost Analysis
        │
        ├──────────────► Budget Variance
        │
        └──────────────► Common-Cost Allocation
                                  │
                                  ▼
                         Owner-Level Assessment
                                  │
                                  ▼
                         Management Decision
```

The important design choice is that **validation runs alongside the analytical path**, rather than being treated as a final cosmetic check. This keeps questionable records visible before they become apparently precise management metrics. 

---

### Other Tools in This Series

* **Landed Cost Calculation & Reconciliation Toolkit** — allocation, benchmark comparison, and variance investigation for imported goods.
* **Construction Cost & BOQ Control Tools** — structured estimating and project-level cost control.
* **Inventory & Reorder Planning Tools** — operational planning models for stock, demand, and purchasing decisions.
* **Financial Forecasting & Scenario Models** — lightweight planning frameworks connecting operating assumptions with financial outcomes.

---

### License

This project is released under the **Apache License 2.0**.

See the repository `LICENSE` file for the complete license text.
