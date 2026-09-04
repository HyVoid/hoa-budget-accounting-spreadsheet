import React, { useState } from 'react';
import { Receipt, Plus, Trash2, Search, Filter, AlertCircle } from 'lucide-react';
import { SystemParameters, Transaction } from '../types';
import { formatCurrency } from '../utils/engine';
import { InsightBlock } from './InsightBlock';

interface TransactionsViewProps {
  transactions: Transaction[];
  parameters: SystemParameters;
  onChange: (updated: Transaction[]) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  parameters,
  onChange,
}) => {
  const [search, setSearch] = useState('');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newRef, setNewRef] = useState('');
  const [newPayee, setNewPayee] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const currency = parameters.currencySymbol;

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.payee.toLowerCase().includes(search.toLowerCase()) ||
      t.rawDescription.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (monthFilter !== 'all') {
      const m = parseInt(monthFilter);
      const dateM = new Date(t.date).getMonth() + 1;
      return dateM === m;
    }

    return true;
  });

  const totalFilteredAmount = filteredTransactions.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0
  );

  const handleUpdate = (id: string, field: keyof Transaction, value: any) => {
    const updated = transactions.map((t) => (t.id === id ? { ...t, [field]: value } : t));
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(transactions.filter((t) => t.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayee.trim() || !newAmount) return;

    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      date: newDate,
      reference: newRef.trim() || `CHK-${Math.floor(1000 + Math.random() * 9000)}`,
      payee: newPayee.trim(),
      rawDescription: newDesc.trim() || `${newPayee} invoice payment`,
      amount: parseFloat(newAmount) || 0,
    };

    onChange([newTrx, ...transactions]);
    setNewPayee('');
    setNewDesc('');
    setNewAmount('');
    setNewRef('');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
            Sheet Code: INP_Transactions
          </div>
          <h1 className="font-display font-semibold text-[28px] tracking-display text-[#051C2C] leading-tight">
            Raw Inflow & Expense Ledger
          </h1>
          <p className="text-[13px] text-[#888888] mt-0.5">
            Operational entry point for bank transactions, vendor disbursements, and credits.
          </p>
        </div>

        {/* Ledger Balance Summary */}
        <div className="bg-white px-4 py-2 rounded-[8px] border border-[#E8E8E6] text-right">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">
            Filtered Ledger Total
          </span>
          <span className="font-bold text-[#051C2C] text-[16px] tabular-nums">
            {formatCurrency(totalFilteredAmount, currency, 2)}
          </span>
        </div>
      </div>

      <InsightBlock title="Zero Data Prep Ingestion">
        Paste or type vendor invoices, utilities, or maintenance bills as they appear on your bank
        statement. The automated cleansing pipeline (`ENG_CostCleansing`) will parse dates, match
        keywords, and feed calculations in real time without manual reconciliation.
      </InsightBlock>

      {/* Add Transaction Form - Clean Minimalism */}
      <form
        onSubmit={handleAdd}
        className="card flex flex-wrap items-end gap-3"
      >
        <div className="w-36">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Transaction Date
          </label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="cell-editable w-full text-[12px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="w-28">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Voucher / Ref #
          </label>
          <input
            type="text"
            placeholder="CHK-9120"
            value={newRef}
            onChange={(e) => setNewRef(e.target.value)}
            className="cell-editable w-full text-[12px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Payee / Vendor
          </label>
          <input
            type="text"
            placeholder="e.g. Otis Elevator Co"
            value={newPayee}
            onChange={(e) => setNewPayee(e.target.value)}
            className="cell-editable w-full text-[12px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Raw Memo / Description
          </label>
          <input
            type="text"
            placeholder="e.g. Quarterly elevator hoist cable lubrication"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="cell-editable w-full text-[12px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="w-32">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#051C2C] mb-1">
            Amount ({currency})
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="1200.00"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="cell-editable w-full text-[12px] px-3 py-1.5 rounded-[6px] border border-amber-200 text-[#051C2C] font-semibold focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-blue-700 rounded-[6px] transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Record Item</span>
        </button>
      </form>

      {/* Transactions Table Container - Clean Minimalism */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E8E6] gap-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display font-semibold text-[18px] tracking-heading text-[#051C2C]">
              Operational Disbursements ({filteredTransactions.length} of {transactions.length} rows)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter by month */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="text-[12px] px-2 py-1 rounded-[6px] border border-[#E8E8E6] bg-white text-[#051C2C] focus:outline-none focus:border-[#2251FF]"
              >
                <option value="all">All Months</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    Month {m} (
                    {new Date(2026, m - 1).toLocaleString('default', { month: 'short' })})
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search vendor or memo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-[12px] rounded-[6px] border border-[#E8E8E6] focus:outline-none focus:border-[#2251FF]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-th p-2.5 w-12 text-center rounded-l-[6px]">#</th>
                <th className="table-th p-2.5 w-32">Date</th>
                <th className="table-th p-2.5 w-28">Voucher #</th>
                <th className="table-th p-2.5 w-52">Payee / Vendor</th>
                <th className="table-th p-2.5">Raw Description Memo</th>
                <th className="table-th p-2.5 text-right w-36">Amount ({currency})</th>
                <th className="table-th p-2.5 text-center w-16 rounded-r-[6px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {filteredTransactions.map((trx, idx) => {
                const isNegative = trx.amount < 0;
                return (
                  <tr
                    key={trx.id}
                    className={`hover:bg-[#F5F5F2] transition-colors ${
                      isNegative ? 'anomaly-row' : ''
                    }`}
                  >
                    <td className="p-2.5 text-center text-gray-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="p-2.5">
                      <input
                        type="date"
                        value={trx.date}
                        onChange={(e) => handleUpdate(trx.id, 'date', e.target.value)}
                        className="cell-editable px-2 py-0.5 text-[12px] font-mono text-[#051C2C] rounded-[4px] border border-amber-200 w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={trx.reference}
                        onChange={(e) => handleUpdate(trx.id, 'reference', e.target.value)}
                        className="cell-editable px-2 py-0.5 text-[12px] font-mono text-[#051C2C] rounded-[4px] border border-amber-200 w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={trx.payee}
                        onChange={(e) => handleUpdate(trx.id, 'payee', e.target.value)}
                        className="cell-editable px-2 py-0.5 text-[12px] font-medium text-[#051C2C] rounded-[4px] border border-amber-200 w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5">
                      <input
                        type="text"
                        value={trx.rawDescription}
                        onChange={(e) => handleUpdate(trx.id, 'rawDescription', e.target.value)}
                        className="cell-editable px-2 py-0.5 text-[12px] text-[#051C2C] rounded-[4px] border border-amber-200 w-full focus:outline-none focus:border-[#2251FF]"
                      />
                    </td>
                    <td className="p-2.5 text-right">
                      <input
                        type="number"
                        step="0.01"
                        value={trx.amount}
                        onChange={(e) =>
                          handleUpdate(trx.id, 'amount', parseFloat(e.target.value) || 0)
                        }
                        className={`cell-editable px-2 py-0.5 text-[12px] font-mono font-semibold text-right rounded-[4px] border border-amber-200 w-28 focus:outline-none focus:border-[#2251FF] ${
                          isNegative ? 'text-[#D32F2F]' : 'text-[#051C2C]'
                        }`}
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => handleDelete(trx.id)}
                        className="p-1 text-gray-400 hover:text-[#D32F2F] transition-colors cursor-pointer rounded"
                        title="Delete record"
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
