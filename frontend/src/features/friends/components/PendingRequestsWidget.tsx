import React, { use, useEffect } from "react";
import { Check, X } from "lucide-react";
import { useFriendStats } from "../hooks/useFriendStatus";

export const PendingRequestsWidget = () => {
  const { pendingFriends, acceptFriend, rejectFriend } = useFriendStats();
  const displayRequests = pendingFriends ? pendingFriends.slice(0, 2) : [];

  useEffect(() => {
    console.log("Pending Friends", pendingFriends);
  }, [pendingFriends]);

  return (
    <div className="bg-card-bg border border-border-subtle rounded-2xl p-6 shadow-xl w-full flex flex-col gap-4">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold text-text-main tracking-wide">
          Solicitudes Pendientes
        </h2>
        {pendingFriends
          ? pendingFriends.length > 2
          : false && (
              <button className="text-xs font-semibold text-principal hover:text-principal/80 hover:underline transition-all">
                Ver todas ({pendingFriends?.length})
              </button>
            )}
      </div>

      {/* Lista de Solicitudes */}
      <div className="flex flex-col gap-3">
        {displayRequests.length === 0 ? (
          <p className="text-sm text-text-subtle text-center py-4">
            No tienes solicitudes pendientes.
          </p>
        ) : (
          displayRequests.map((req) => (
            <div
              key={req.request_id}
              className="flex items-center justify-between p-3 rounded-xl bg-background border border-border-subtle/50 hover:border-border-subtle transition-colors"
            >
              {/* Info del usuario */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-black text-white ${req.bgColor}`}
                >
                  {req.sender_initials}
                </div>
                <div className="flex flex-col truncate pr-2">
                  <span
                    className="text-[13px] font-semibold text-text-main truncate"
                    title={req.sender_name}
                  >
                    {req.sender_name}
                  </span>
                  <span className="text-[11px] text-text-subtle truncate">
                    Quiere añadirte
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Botón Rechazar (X) */}
                <button
                  onClick={() => rejectFriend(req.request_id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  title="Rechazar"
                >
                  <X size={16} />
                </button>
                {/* Botón Aceptar (Check) */}
                <button
                  onClick={() => acceptFriend(req.request_id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                  title="Aceptar"
                >
                  <Check size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
