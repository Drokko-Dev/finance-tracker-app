import React, { useState, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  RefreshCcw,
  UserCheck,
  Wallet,
  Trash2,
  Tag as TagIcon,
} from "lucide-react";
import { EditTransactionModal } from "./EditTransactionModal";

interface Transaction {
  id: number;
  account: {
    id: number;
    name: string;
    bank: string;
  };
  category: {
    id: number;
    name: string;
  };
  tag_id?: number | null; // aqui hay que cambiar segun el modelo de los tag cuando se agregen
  type: string;
  amount: number;
  title: string;
  description?: string | null;
  transaction_split: boolean; // En Pydantic tiene default False, así que no es estrictamente nulo en la respuesta
  payment_method: string;
  card_id?: number | null; // Nuevo campo
  created_at: string | Date; // datetime de Python se mapea a string (ISO) o Date en TS
  deleted_at?: string | Date | null; // Nuevo campo opcional
  /* cycle: {
    id: number;
    name: string;

  }; */
}
interface Props {
  transaction: Transaction;
}

const TransactionCard: React.FC<Props> = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Funciones para el modal
  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleSave = (data: any) => {
    console.log("Nuevos datos:", data);
    // Si data.account === 'new', aquí dispararías la lógica para crear cuenta
    closeModal();
  };

  const isIncome = transaction.type === "income";

  // Formateador de moneda (CLP/Local)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  // Formateador de fecha
  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-4xl shadow-sm border border-gray-100 md:pr-4 md:pb-4 md:pl-4 md:pt-2 mb-6 max-w-7xl mx-auto mt-5 min-w-65">
      {/* HEADER: Icono, Título y Monto */}
      <div className="grid-rows-2 md:flex items-center justify-between mb-1">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-2xl ${isIncome ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
          >
            {isIncome ? (
              <ArrowUpCircle size={32} />
            ) : (
              <ArrowDownCircle size={32} />
            )}
          </div>
          <div>
            <h3 className=" text-xl md:text-2xl font-semibold text-gray-800">
              {transaction.title}
            </h3>
          </div>
        </div>

        <div className="text-center md:text-right md:mt-3">
          <span
            className={` text-2xl md:text-4xl font-bold ${isIncome ? "text-emerald-700" : "text-red-700"}`}
          >
            {formatCurrency(transaction.amount)}
          </span>
          {/* Tags Desktop (al lado del monto) */}
          <div className="flex gap-2 mt-2 justify-start md:justify-end">
            {transaction.transaction_split ? (
              <UserCheck size={18} className="text-black mt-2.5 " />
            ) : null}
            <span className="mt-2 px-3 py-1 rounded-lg bg-pink-50 text-pink-600 text-xs font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-pink-400 rounded-sm"></span>{" "}
              {transaction.category.name}
            </span>
            <span className="mt-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium flex items-center gap-1">
              <TagIcon size={12} /> {transaction.tag_id}
            </span>
          </div>
        </div>
      </div>

      {/* METADATA: Fecha y Ciclo */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-2 text-gray-500 text-sm border-b md:border-none pb-4 md:pb-0">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <span className="font-medium text-gray-400">Fecha:</span>
          <span className="text-gray-800 font-semibold">
            {formatDate(transaction.created_at)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCcw size={18} className="text-gray-400" />
          <span className="font-medium text-gray-400">Ciclo:</span>
          {/* <span className="text-gray-800 font-semibold">
            {transaction.cycle.name}
          </span> */}
        </div>
      </div>

      {/* DESCRIPCIÓN COLLAPSIBLE */}
      <div className="border-t border-gray-100 pt-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-gray-400 font-bold text-xs uppercase tracking-wider mb-2"
        >
          <span>Más información</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isOpen && (
          <div className="bg-gray-50 rounded-2xl p-6 text-gray-600 text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
            {/* CARDS: Deuda y Cuenta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Deuda Card */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl text-amber-500 shadow-sm">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h4 className="text-amber-700 font-bold text-sm">
                    Deuda asociada a amigo
                  </h4>
                  <p className="text-amber-600 text-xs font-medium">
                    {transaction.transaction_split} vinculado
                  </p>
                </div>
              </div>

              {/* Account Card */}
              <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl text-gray-600 shadow-sm border border-gray-100">
                  <Wallet size={24} />
                </div>
                <div>
                  <h4 className="text-gray-800 font-bold text-base">
                    {transaction.account.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {transaction.account.bank} · #{transaction.account.id}
                  </p>
                </div>
              </div>
            </div>
            {transaction.description ? (
              <span className="text-text-main">{transaction.description}</span>
            ) : null}
          </div>
        )}
      </div>

      {/* ACCIONES */}
      <div className="flex justify-between items-center mt-3">
        <button className="text-red-400 hover:text-red-600 transition-colors">
          <Trash2 size={24} />
        </button>
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-emerald-100"
          onClick={openModal}
        >
          Editar
        </button>
      </div>
      {/* Componente Modal */}
      {/* <EditTransactionModal
        ref={dialogRef}
        transaction={transaction}
        onClose={closeModal}
        onSave={handleSave}
        // Estas listas vendrían de tu componente padre o un context
        cycles={[
          { id: 1, name: "Primer ciclo" },
          { id: 2, name: "Segundo ciclo" },
        ]}
        categories={[
          { id: 10, name: "Trabajo" },
          { id: 11, name: "Ocio" },
        ]}
        accounts={[{ id: 7, name: "Ahorro Vista", bank: "Banco Estado" }]}
        friends={[{ id: "friend_1", name: "Juanito" }]}
      /> */}
    </div>
  );
};

export default TransactionCard;
