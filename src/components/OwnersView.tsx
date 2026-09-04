import React, { useState } from 'react';
import { Users, Plus, Trash2, Home, Layers } from 'lucide-react';
import { OwnerUnit } from '../types';
import { formatPercent } from '../utils/engine';
import { InlineDataBar } from './InlineDataBar';
import { InsightBlock } from './InsightBlock';

interface OwnersViewProps {
  owners: OwnerUnit[];
  onChange: (updated: OwnerUnit[]) => void;
}

export const OwnersView: React.FC<OwnersViewProps> = ({
  owners,
  onChange,
}) => {
  const [newUnitId, setNewUnitId] = useState('');
  const [newName, setNewName] = useState('');
  const [newBuilding, setNewBuilding] = useState('North Wing');
  const [newSqFt, setNewSqFt] = useState('');

  const totalSqFt = owners.reduce((sum, u) => sum + (Number(u.sqft) || 0), 0);
  const totalUnits = owners.length;

  const handleUpdate = (id: string, field: keyof OwnerUnit, value: any) => {
    const updated = owners.map((u) => (u.id === id ? { ...u, [field]: value } : u));
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(owners.filter((u) => u.id !== id));
  };

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitId.trim() || !newName.trim() || !newSqFt) return;

    const newUnit: OwnerUnit = {
      id: `own-${Date.now()}`,
      unitId: newUnitId.trim(),
      ownerName: newName.trim(),
      building: newBuilding.trim(),
      sqft: parseFloat(newSqFt) || 1000,
      customWeight: 1.0,
      notes: 'Active unit',
    };

    onChange([...owners, newUnit]);
    setNewUnitId('');
    setNewName('');
    setNewSqFt('');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
            Sheet Code: DIM_Owners
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Owner Register & Property Area Basis
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Unit registry, registered deed square footage, and dynamic allocation weight baselines.
          </p>
        </div>

        {/* Stats Summary Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-[8px] border border-[#E8E8E6] text-right">
            <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
              Total Community Area
            </span>
            <span className="font-bold text-[#051C2C] text-[15px] tabular-nums">
              {totalSqFt.toLocaleString()} sqft
            </span>
          </div>
          <div className="bg-white px-4 py-2 rounded-[8px] border border-[#E8E8E6] text-right">
            <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
              Total Units
            </span>
            <span className="font-bold text-[#051C2C] text-[15px] tabular-nums">
              {totalUnits} Units
            </span>
          </div>
        </div>
      </div>

      <InsightBlock title="Dynamic Area Weight Normalization">
        Every unit&apos;s allocation share is calculated automatically as{' '}
        <code>Unit_SqFt / Community_Total_SqFt</code>. Whenever unit square footage is modified or new
        units are registered, all individual shares re-normalize instantly to ensure 100.0000%
        mathematical equilibrium without residual rounding drift.
      </InsightBlock>

      {/* Add Unit Form - Clean Minimalism */}
      <form
        onSubmit={handleAddUnit}
        className="card flex flex-wrap items-end gap-3"
      >
        <div className="w-36">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Unit ID / Door #
          </label>
          <input
            type="text"
            placeholder="e.g. Unit 404"
            value={newUnitId}
            onChange={(e) => setNewUnitId(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Owner / Titleholder Name
          </label>
          <input
            type="text"
            placeholder="e.g. Samuel & Sarah Jenkins"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="w-44">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Building / Wing
          </label>
          <select
            value={newBuilding}
            onChange={(e) => setNewBuilding(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          >
            <option value="North Wing">North Wing</option>
            <option value="South Wing">South Wing</option>
            <option value="East Tower">East Tower</option>
            <option value="West Tower">West Tower</option>
          </select>
        </div>

        <div className="w-32">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Area (SqFt)
          </label>
          <input
            type="number"
            placeholder="e.g. 1250"
            value={newSqFt}
            onChange={(e) => setNewSqFt(e.target.value)}
            className="cell-editable w-full text-[13px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-blue-700 rounded-[6px] transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Unit</span>
        </button>
      </form>

      {/* Owners Table - Clean Minimalism */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Deeded Units Register ({owners.length} Records)
            </h2>
          </div>
          <span className="text-[12px] text-[#888888]">
            Total SqFt: <strong className="text-[#051C2C]">{totalSqFt.toLocaleString()}</strong>
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-th p-2.5 w-12 text-center rounded-l-[6px]">#</th>
                <th className="table-th p-2.5 w-32">Unit Door ID</th>
                <th className="table-th p-2.5">Owner / Tenant</th>
                <th className="table-th p-2.5 w-36">Building Wing</th>
                <th className="table-th p-2.5 text-right w-28">Area (SqFt)</th>
                <th className="table-th p-2.5 w-44">SqFt Weight %</th>
                <th className="table-th p-2.5 text-right w-28">Equal Weight</th>
                <th className="table-th p-2.5 text-right w-24">Custom Coeff</th>
                <th className="table-th p-2.5 text-center w-16 rounded-r-[6px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {owners.map((unit, idx) => {
                const sqft = Number(unit.sqft) || 0;
                const sqftWeight = totalSqFt > 0 ? sqft / totalSqFt : 0;
                const equalWeight = totalUnits > 0 ? 1 / totalUnits : 0;

                return (
                  <tr key={unit.id} className="hover:bg-[#F5F5F2] transition-colors">
                    <td className="p-2.5 text-center text-gray-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={unit.unitId}
                        onChange={(e) => handleUpdate(unit.id, 'unitId', e.target.value)}
                        className="cell-editable px-2 py-1 text-[12px] font-semibold text-[#051C2C] rounded-[4px] border border-amber-200 w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={unit.ownerName}
                        onChange={(e) => handleUpdate(unit.id, 'ownerName', e.target.value)}
                        className="cell-editable px-2 py-1 text-[12px] text-[#051C2C] rounded-[4px] border border-amber-200 w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={unit.building}
                        onChange={(e) => handleUpdate(unit.id, 'building', e.target.value)}
                        className="cell-editable px-2 py-1 text-[12px] text-[#051C2C] rounded-[4px] border border-amber-200 w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5 text-right">
                      <input
                        type="number"
                        value={unit.sqft}
                        onChange={(e) =>
                          handleUpdate(unit.id, 'sqft', parseFloat(e.target.value) || 0)
                        }
                        className="cell-editable px-2 py-1 text-[12px] text-right font-mono text-[#051C2C] rounded-[4px] border border-amber-200 w-24 focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5">
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-mono text-gray-700 text-right">
                          {formatPercent(sqftWeight, 4)}
                        </div>
                        <InlineDataBar value={sqftWeight} maxValue={0.2} />
                      </div>
                    </td>
                    <td className="p-2.5 text-right font-mono text-[12px] text-gray-600">
                      {formatPercent(equalWeight, 3)}
                    </td>
                    <td className="p-2.5 text-right">
                      <input
                        type="number"
                        step="0.05"
                        value={unit.customWeight}
                        onChange={(e) =>
                          handleUpdate(unit.id, 'customWeight', parseFloat(e.target.value) || 1.0)
                        }
                        className="cell-editable px-2 py-1 text-[12px] text-right font-mono text-[#051C2C] rounded-[4px] border border-amber-200 w-16 focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleDelete(unit.id)}
                        className="p-1 text-gray-400 hover:text-[#D32F2F] transition-colors cursor-pointer rounded"
                        title="Delete unit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
