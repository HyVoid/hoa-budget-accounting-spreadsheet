import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Search, ArrowUpDown } from 'lucide-react';
import { CostMappingRule } from '../types';
import { InsightBlock } from './InsightBlock';

interface CostMappingViewProps {
  rules: CostMappingRule[];
  onChange: (updated: CostMappingRule[]) => void;
}

export const CostMappingView: React.FC<CostMappingViewProps> = ({
  rules,
  onChange,
}) => {
  const [search, setSearch] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newCategory, setNewCategory] = useState('Utilities');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newAllocation, setNewAllocation] = useState<'SqFt' | 'Equal' | 'Weight' | 'Exclude'>('SqFt');

  const filteredRules = rules.filter(
    (r) =>
      r.keyword.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase()) ||
      r.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (id: string, field: keyof CostMappingRule, value: any) => {
    const updated = rules.map((r) => (r.id === id ? { ...r, [field]: value } : r));
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(rules.filter((r) => r.id !== id));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newSubcategory.trim()) return;

    const newRule: CostMappingRule = {
      id: `cm-${Date.now()}`,
      keyword: newKeyword.trim().toLowerCase(),
      category: newCategory.trim(),
      subcategory: newSubcategory.trim(),
      allocationType: newAllocation,
    };

    onChange([newRule, ...rules]);
    setNewKeyword('');
    setNewSubcategory('');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
            Sheet Code: DIM_CostMapping
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Cost Classification & Rule Dictionary
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Dictionary-driven fuzzy keyword matching engine for automated ledger categorization.
          </p>
        </div>
      </div>

      <InsightBlock title="Rule Propagation Mechanics">
        When an unmapped transaction appears in the ledger, simply append the vendor or description
        keyword here. The Cleansing Engine (`ENG_CostCleansing`) will instantaneously classify the
        transaction, route its allocation formula, and recalculate monthly variances across the
        entire application.
      </InsightBlock>

      {/* Add Rule Form */}
      <form
        onSubmit={handleAddRule}
        className="card flex flex-wrap items-end gap-3"
      >
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Search Keyword (Fuzzy Match)
          </label>
          <input
            type="text"
            placeholder="e.g. elevator, tree, janitor"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="w-48">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Primary Category
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

        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Secondary Subcategory
          </label>
          <input
            type="text"
            placeholder="e.g. Elevator Service, Water & Sewer"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="w-36">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Allocation Type
          </label>
          <select
            value={newAllocation}
            onChange={(e) => setNewAllocation(e.target.value as any)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          >
            <option value="SqFt">SqFt</option>
            <option value="Equal">Equal</option>
            <option value="Weight">Weight</option>
            <option value="Exclude">Exclude</option>
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-blue-700 rounded-[6px] transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Keyword Rule</span>
        </button>
      </form>

      {/* Rules Table */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E8E6] gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Active Mapping Dictionary ({rules.length} Rules)
            </h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search keyword or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-[12px] rounded-[6px] border border-[#E8E8E6] focus:outline-none focus:border-[#2251FF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-th p-2.5 w-16 text-center rounded-l-[6px]">#</th>
                <th className="table-th p-2.5">Keyword Matcher</th>
                <th className="table-th p-2.5">Primary Category</th>
                <th className="table-th p-2.5">Secondary Subcategory</th>
                <th className="table-th p-2.5">Assigned Allocation</th>
                <th className="table-th p-2.5 text-center w-20 rounded-r-[6px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filteredRules.map((rule, idx) => (
                <tr key={rule.id} className="hover:bg-[#F5F5F2] transition-colors">
                  <td className="p-2.5 text-center text-gray-400 font-mono text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="p-2.5">
                    <input
                      type="text"
                      value={rule.keyword}
                      onChange={(e) => handleUpdate(rule.id, 'keyword', e.target.value)}
                      className="cell-editable px-2 py-1 text-[12px] font-mono rounded-[4px] border border-amber-200 text-[#051C2C] w-full max-w-[200px] focus:outline-none focus:border-[#2251FF]"
                    />
                  </td>
                  <td className="p-2.5">
                    <input
                      type="text"
                      value={rule.category}
                      onChange={(e) => handleUpdate(rule.id, 'category', e.target.value)}
                      className="cell-editable px-2 py-1 text-[12px] rounded-[4px] border border-amber-200 text-[#051C2C] w-full max-w-[200px] focus:outline-none focus:border-[#2251FF]"
                    />
                  </td>
                  <td className="p-2.5">
                    <input
                      type="text"
                      value={rule.subcategory}
                      onChange={(e) => handleUpdate(rule.id, 'subcategory', e.target.value)}
                      className="cell-editable px-2 py-1 text-[12px] rounded-[4px] border border-amber-200 text-[#051C2C] w-full max-w-[220px] focus:outline-none focus:border-[#2251FF]"
                    />
                  </td>
                  <td className="p-2.5">
                    <select
                      value={rule.allocationType}
                      onChange={(e) => handleUpdate(rule.id, 'allocationType', e.target.value as any)}
                      className="cell-editable px-2 py-1 text-[12px] rounded-[4px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
                    >
                      <option value="SqFt">SqFt</option>
                      <option value="Equal">Equal</option>
                      <option value="Weight">Weight</option>
                      <option value="Exclude">Exclude</option>
                    </select>
                  </td>
                  <td className="p-2.5 text-center">
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="p-1 text-gray-400 hover:text-[#D32F2F] transition-colors cursor-pointer rounded"
                      title="Delete rule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
