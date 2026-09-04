import React, { useState } from 'react';
import { PiggyBank, Plus, Trash2 } from 'lucide-react';
import { BudgetRow, SystemParameters } from '../types';
import { formatCurrency } from '../utils/engine';
import { InsightBlock } from './InsightBlock';

interface BudgetViewProps {
  budget: BudgetRow[];
  parameters: SystemParameters;
  onChange: (updated: BudgetRow[]) => void;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const BudgetView: React.FC<BudgetViewProps> = ({
  budget,
  parameters,
  onChange,
}) => {
  const [newCategory, setNewCategory] = useState('Utilities');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newMonthlyAmount, setNewMonthlyAmount] = useState('1000');

  const currency = parameters.currencySymbol;

  const handleUpdateMonth = (id: string, monthIndex: number, value: number) => {
    const updated = budget.map((b) => {
      if (b.id !== id) return b;
      const newMonths = [...b.months];
      newMonths[monthIndex] = value;
      return { ...b, months: newMonths };
    });
    onChange(updated);
  };

  const handleUpdateName = (id: string, field: 'category' | 'subcategory', value: string) => {
    const updated = budget.map((b) => (b.id === id ? { ...b, [field]: value } : b));
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(budget.filter((b) => b.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubcategory.trim()) return;

    const baseVal = parseFloat(newMonthlyAmount) || 0;
    const newRow: BudgetRow = {
      id: `bgt-${Date.now()}`,
      category: newCategory.trim(),
      subcategory: newSubcategory.trim(),
      months: Array(12).fill(baseVal),
    };

    onChange([...budget, newRow]);
    setNewSubcategory('');
  };

  // Calculate Column Totals
  const monthTotals = Array(12).fill(0);
  let grandTotal = 0;

  budget.forEach((b) => {
    (b.months || []).forEach((val, idx) => {
      monthTotals[idx] += Number(val) || 0;
      grandTotal += Number(val) || 0;
    });
  });

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
            Sheet Code: INP_Budget
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Approved Operating Budget Ledger
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            FY {parameters.activeYear} Board-authorized monthly spending caps by subcategory.
          </p>
        </div>

        {/* Total Annual Budget KPI */}
        <div className="bg-white px-4 py-2 rounded-[8px] border border-[#E8E8E6] text-right">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
            Total Annual Budget
          </span>
          <span className="font-bold text-[#051C2C] text-[16px] tabular-nums">
            {formatCurrency(grandTotal, currency, 0)}
          </span>
        </div>
      </div>

      <InsightBlock title="Dynamic Phased Variance Alignment">
        Budget lines are parsed across calendar months (M01 to M12). The variance engine
        (`RPT_BudgetVariance`) cumulates the budget strictly up to the current active month (Month{' '}
        {parameters.activeMonth}), preventing false surplus signals from unspent future quarters.
      </InsightBlock>

      {/* Add Row Form - Clean Minimalism */}
      <form
        onSubmit={handleAdd}
        className="card flex flex-wrap items-end gap-3"
      >
        <div className="w-52">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Category
          </label>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          >
            <option value="Utilities">Utilities</option>
            <option value="Maintenance & Repairs">Maintenance & Repairs</option>
            <option value="Grounds & Exterior">Grounds & Exterior</option>
            <option value="Safety & Security">Safety & Security</option>
            <option value="Amenities">Amenities</option>
            <option value="Administrative">Administrative</option>
          </select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Subcategory Line Item
          </label>
          <input
            type="text"
            placeholder="e.g. Fire Suppression System"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="w-36">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Default Monthly Amount
          </label>
          <input
            type="number"
            placeholder="1000"
            value={newMonthlyAmount}
            onChange={(e) => setNewMonthlyAmount(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-blue-700 rounded-[6px] transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Budget Item</span>
        </button>
      </form>

      {/* Budget Matrix Table Container - Clean Minimalism */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              12-Month Operating Allocation Matrix ({budget.length} Items)
            </h2>
          </div>
          <span className="text-[12px] text-[#888888]">
            Active Month Highlight:{' '}
            <strong className="text-[#2251FF]">
              M{String(parameters.activeMonth).padStart(2, '0')} (
              {MONTH_NAMES[parameters.activeMonth - 1]})
            </strong>
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr>
                <th className="table-th p-2.5 w-44 rounded-l-[6px]">Category</th>
                <th className="table-th p-2.5 w-52">Subcategory</th>
                {MONTH_NAMES.map((m, idx) => {
                  const isActive = idx + 1 === parameters.activeMonth;
                  return (
                    <th
                      key={m}
                      className={`table-th p-2 text-right w-20 font-mono text-[11px] ${
                        isActive ? 'bg-[rgba(34,81,255,0.08)] text-[#2251FF]' : ''
                      }`}
                    >
                      {m}
                    </th>
                  );
                })}
                <th className="table-th p-2 text-right w-28 font-semibold">Total Year</th>
                <th className="table-th p-2 text-center w-12 rounded-r-[6px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
              {budget.map((b) => {
                const rowTotal = (b.months || []).reduce(
                  (sum, v) => sum + (Number(v) || 0),
                  0
                );

                return (
                  <tr key={b.id} className="hover:bg-[#F5F5F2] transition-colors">
                    <td className="p-2">
                      <input
                        type="text"
                        value={b.category}
                        onChange={(e) => handleUpdateName(b.id, 'category', e.target.value)}
                        className="cell-editable px-2 py-0.5 text-[12px] rounded-[4px] border border-amber-200 text-[#051C2C] w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={b.subcategory}
                        onChange={(e) => handleUpdateName(b.id, 'subcategory', e.target.value)}
                        className="cell-editable px-2 py-0.5 text-[12px] font-medium rounded-[4px] border border-amber-200 text-[#051C2C] w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    {MONTH_NAMES.map((_, mIdx) => {
                      const isActive = mIdx + 1 === parameters.activeMonth;
                      return (
                        <td
                          key={mIdx}
                          className={`p-1 text-right ${
                            isActive ? 'bg-[rgba(34,81,255,0.02)] font-medium' : ''
                          }`}
                        >
                          <input
                            type="number"
                            value={b.months[mIdx] ?? 0}
                            onChange={(e) =>
                              handleUpdateMonth(b.id, mIdx, parseFloat(e.target.value) || 0)
                            }
                            className="cell-editable px-1 py-0.5 text-[11px] font-mono text-right rounded-[4px] border border-amber-200 text-[#051C2C] w-full focus:outline-none focus:border-[#2251FF]"
                          />
                        </td>
                      );
                    })}
                    <td className="p-2 text-right font-bold text-[#051C2C] font-mono text-[12px] tabular-nums">
                      {formatCurrency(rowTotal, currency, 0)}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1 text-gray-400 hover:text-[#D32F2F] transition-colors cursor-pointer rounded"
                        title="Delete line item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Summary Row */}
            <tfoot>
              <tr className="bg-[#F5F5F2] font-semibold text-[#051C2C] border-t-2 border-[#E8E8E6] text-[12px]">
                <td colSpan={2} className="p-2.5 font-bold uppercase tracking-wider text-[11px]">
                  Total Monthly Operating Budget
                </td>
                {monthTotals.map((tot, idx) => (
                  <td key={idx} className="p-2 text-right font-mono text-[11px] tabular-nums">
                    {formatCurrency(tot, currency, 0)}
                  </td>
                ))}
                <td className="p-2.5 text-right font-bold text-[#2251FF] font-mono text-[13px] tabular-nums">
                  {formatCurrency(grandTotal, currency, 0)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
