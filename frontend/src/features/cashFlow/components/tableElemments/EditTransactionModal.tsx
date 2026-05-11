import React, { forwardRef, useEffect, useRef } from 'react';
import { X, PlusCircle } from 'lucide-react';
import type { Option, Friend } from './tableTypes';

interface Transaction {
  id: number;
  amount: number;
  title: string; // Mantengo el nombre exacto de tu JSON
  description: string;
  type: "income" | "expense";
  created_at: string;
  tag: string;
  cycle: {
    id: number;
    name: string;
  };
  account: {
    id: number;
    name: string;
    bank: string;
  };
  category: {
    id: number;
    name: string;
  };
  debt: string | null;
}

interface EditModalProps {
  transaction: Transaction;
  onClose: () => void;
  onSave: (formData: any) => void;
  // Listas provenientes de UseState()
  cycles: Option[];
  categories: Option[];
  accounts: Option[];
  friends: Friend[];
}

export const EditTransactionModal = forwardRef<HTMLDialogElement, EditModalProps>(
  ({ transaction, onClose, onSave, cycles, categories, accounts, friends }, ref) => {
    
    // Función para manejar el envío
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      onSave(data);
    };

    return (
      <dialog
        ref={ref}
        className="backdrop:bg-black/50 backdrop:backdrop-blur-sm rounded-4xl shadow-2xl p-0 w-[95%] max-w-2xl border-none overflow-y-auto m-auto"
        onClick={(e) => {
          // Cerrar si se hace click fuera del contenido (en el backdrop)
          if (e.target === ref.current) onClose();
        }}
      >
        <div className="bg-white px-6 md:px-7">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Editar Transacción</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título y Monto en una fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Título</label>
                <input
                  name="tittle"
                  type="text"
                  placeholder={transaction.title}
                  defaultValue={transaction.title}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Monto ($)</label>
                <input
                  name="amount"
                  type="number"
                  placeholder={transaction.amount.toString()}
                  defaultValue={transaction.amount}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-emerald-700"
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-500 uppercase ml-1">Descripción</label>
              <textarea
                name="description"
                rows={3}
                placeholder={transaction.description}
                defaultValue={transaction.description}
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Fecha y Tipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Fecha</label>
                <input
                  name="created_at"
                  type="date"
                  defaultValue={transaction.created_at.split('T')[0]}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Tipo</label>
                <select 
                  name="type"
                  defaultValue={transaction.type}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option value="income">Ingreso</option>
                  <option value="expense">Egreso</option>
                </select>
              </div>
            </div>

            {/* Selects: Cuenta y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Cuenta</label>
                <select 
                  name="account"
                  defaultValue={transaction.account.id}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name} - {acc.bank}</option>
                  ))}
                  <option value="new" className="text-emerald-600 font-bold">+ Agregar nueva cuenta</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Categoría</label>
                <select 
                  name="category"
                  defaultValue={transaction.category.id}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selects: Ciclo y Deuda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Ciclo</label>
                <select 
                  name="cycle"
                  defaultValue={transaction.cycle.id}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  {cycles.map(cyc => (
                    <option key={cyc.id} value={cyc.id}>{cyc.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Deuda (Amigo)</label>
                <select 
                  name="debt"
                  defaultValue={transaction.debt || ""}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option value="">Sin deuda asociada</option>
                  {friends.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Tag</label>
                <input
                  name="tag"
                  type="text"
                  placeholder={transaction.tag}
                  defaultValue={transaction.tag}
                  className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

