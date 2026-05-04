import React, { useState } from "react";
import { Search, Bell } from "lucide-react";

const amigosData = [
  {
    id: 1,
    name: "Carlos Mendoza",
    reason: 'Te debe por "Cena Viernes"',
    amount: 250.0,
    type: "positive",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "online",
  },
  {
    id: 2,
    name: "Ana Lucía",
    reason: 'Le debes por "Uber al centro"',
    amount: -45.0,
    type: "negative",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "offline",
  },
  {
    id: 3,
    name: "Miguel Ríos",
    reason: 'Te debe por "Boletos de Cine"',
    amount: 200.0,
    type: "positive",
    initials: "MR",
    bgColor: "bg-purple-600",
    status: "online",
  },
  {
    id: 4,
    name: "Sofía Vargas",
    reason: "Están a mano",
    amount: 0.0,
    type: "neutral",
    avatar: "https://i.pravatar.cc/150?img=44",
    status: "offline",
  },
  {
    id: 5,
    name: "Juan Pablo",
    reason: 'Le debes por "Regalo Mamá"',
    amount: -75.0,
    type: "negative",
    initials: "JP",
    bgColor: "bg-orange-800",
    status: "offline",
  },
];

export const FriendsDirectory = () => {
  const [activeTab, setActiveTab] = useState("Todos");
  const tabs = ["Todos", "Me deben", "Debo", "A mano"];

  return (
    <div className="bg-[#1A1C23] border border-white/5 rounded-2xl p-6 shadow-xl w-full">
      {/* Header y Buscador */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-white tracking-wide">
          Directorio y Saldos
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar amigo..."
            className="w-full bg-[#252830] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-2 border-b border-white/5 pb-4 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-[#2D313D] text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Lista de Amigos */}
      <div className="flex flex-col">
        {amigosData.map((amigo) => (
          <div
            key={amigo.id}
            className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group"
          >
            {/* Avatar y Datos */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {amigo.avatar ? (
                  <img
                    src={amigo.avatar}
                    alt={amigo.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${amigo.bgColor}`}
                  >
                    {amigo.initials}
                  </div>
                )}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1A1C23] ${amigo.status === "online" ? "bg-emerald-500" : "bg-rose-500"}`}
                ></span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200">
                  {amigo.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{amigo.reason}</p>
              </div>
            </div>

            {/* Monto y Botones de Acción */}
            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-bold ${
                  amigo.type === "positive"
                    ? "text-emerald-400"
                    : amigo.type === "negative"
                      ? "text-rose-400"
                      : "text-gray-500"
                }`}
              >
                {amigo.type === "positive" ? "+" : ""}
                {amigo.type === "negative" ? "-" : ""}$
                {Math.abs(amigo.amount).toFixed(2)}
              </span>

              <div className="w-20 flex justify-end">
                {amigo.type === "positive" && (
                  <button className="p-1.5 bg-[#252830] hover:bg-[#2D313D] rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-4 h-4" />
                  </button>
                )}
                {amigo.type === "negative" && (
                  <button className="px-3 py-1.5 bg-[#252830] hover:bg-[#2D313D] rounded-lg text-xs font-medium text-gray-300 hover:text-white transition-colors">
                    Liquidar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
