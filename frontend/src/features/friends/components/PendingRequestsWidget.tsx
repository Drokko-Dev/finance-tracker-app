import React, { useState } from "react";
import { Check, X, Clock } from "lucide-react";
import { useFriendStats } from "../hooks/useFriendStatus";
import type { PendingRequest, SentRequest } from "@/types/Friends";

export const PendingRequestsWidget = () => {
  const {
    pendingFriends,
    sentRequests,
    acceptFriend,
    rejectFriend,
    cancelRequest,
  } = useFriendStats();
  const [section, setSection] = useState<"incoming" | "outgoing">("incoming");

  const incomingList: PendingRequest[] = pendingFriends ?? [];
  const outgoingList: SentRequest[] = sentRequests ?? [];

  const incomingCount = incomingList.length;
  const outgoingCount = outgoingList.length;
  const totalCount = incomingCount + outgoingCount;

  return (
    <div className="bg-card-bg border border-border-subtle rounded-2xl p-6 shadow-xl w-full flex flex-col gap-4">
      {/* Cabecera */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-text-main tracking-wide flex items-center gap-2">
          Solicitudes Pendientes
          {totalCount > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-principal/15 text-principal">
              {totalCount}
            </span>
          )}
        </h2>
      </div>

      {/* Toggle */}
      <div className="flex gap-1 bg-background rounded-lg p-1">
        <button
          onClick={() => setSection("incoming")}
          className={`flex-1 text-xs px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer border ${
            section === "incoming"
              ? "bg-card-bg text-text-main border-border-subtle"
              : "text-text-subtle hover:text-text-main border-transparent"
          }`}
        >
          Recibidas ({incomingCount})
        </button>
        <button
          onClick={() => setSection("outgoing")}
          className={`flex-1 text-xs px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer border ${
            section === "outgoing"
              ? "bg-card-bg text-text-main border-border-subtle"
              : "text-text-subtle hover:text-text-main border-transparent"
          }`}
        >
          Enviadas ({outgoingCount})
        </button>
      </div>

      {/* Lista */}
      <div
        className="
            max-h-[220px] md:max-h-[300px] 
            overflow-y-auto 
            flex flex-col gap-3 
            pr-2

            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-border-subtle
            hover:[&::-webkit-scrollbar-thumb]:bg-principal/40
          "
      >
        {section === "incoming" ? (
          incomingList.length === 0 ? (
            <p className="text-sm text-text-subtle text-center py-4">
              No tienes solicitudes pendientes.
            </p>
          ) : (
            incomingList.map((req: PendingRequest) => (
              <div
                key={req.request_id}
                className="flex items-center justify-between p-3 rounded-xl bg-background border border-border-subtle/50 hover:border-border-subtle transition-colors"
              >
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
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => rejectFriend(req.request_id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    title="Rechazar"
                  >
                    <X size={16} />
                  </button>
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
          )
        ) : outgoingList.length === 0 ? (
          <p className="text-sm text-text-subtle text-center py-4">
            No tienes solicitudes enviadas.
          </p>
        ) : (
          outgoingList.map((req: SentRequest) => (
            <div
              key={req.request_id}
              className="flex items-center justify-between p-3 rounded-xl bg-background border border-border-subtle/50 hover:border-border-subtle transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-black text-white ${req.bgColor}`}
                >
                  {req.receiver_initials}
                </div>
                <div className="flex flex-col truncate pr-2">
                  <span
                    className="text-[13px] font-semibold text-text-main truncate"
                    title={req.receiver_name}
                  >
                    {req.receiver_name}
                  </span>
                  <span className="text-[11px] text-amber-400/80 truncate flex items-center gap-1">
                    <Clock size={10} />
                    Esperando respuesta
                  </span>
                </div>
              </div>
              <button
                onClick={() => cancelRequest(req.request_id)}
                className="text-xs text-text-subtle hover:text-rose-400 px-2.5 py-1.5 rounded-lg border border-border-subtle hover:border-rose-500/30 transition-all flex-shrink-0 cursor-pointer"
                title="Cancelar solicitud"
              >
                Cancelar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
