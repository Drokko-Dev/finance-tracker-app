import React, { useState } from "react";
import { X, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { sendFriendRequest } from "@/api/friends";

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFriendModal = ({ isOpen, onClose }: AddFriendModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      await sendFriendRequest(email);
      setSuccess(true);
      // Tras 2 segundos de mostrar el éxito, cerramos el modal y limpiamos
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: any) {
      // Atrapamos el error que mande FastAPI (ej. "Ya son amigos")
      const errorMsg =
        err.response?.data?.detail ||
        "Ocurrió un error al enviar la solicitud.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    // Fondo oscuro con desenfoque
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Contenedor del Modal */}
      <div
        className="bg-card-bg border border-border-subtle w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Evita que clics dentro cierren el modal
      >
        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-text-subtle hover:text-text-main transition-colors bg-background p-1.5 rounded-full cursor-pointer"
        >
          <X
            size={20}
            className=" hover:text-red-500 transition-all duration-100 hover:scale-[1.2]"
          />
        </button>

        <div className="p-8">
          {/* Ícono decorativo */}
          <div className="w-16 h-16 bg-principal/10 rounded-2xl flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-principal" />
          </div>

          <h2 className="text-2xl font-bold text-text-main mb-2">
            Añadir nuevo amigo
          </h2>
          <p className="text-sm text-text-subtle mb-8">
            Ingresa el correo electrónico de tu amigo para enviarle una
            solicitud. Deberá aceptarla para que puedan compartir gastos.
          </p>

          {success ? (
            // Estado de Éxito
            <div className="flex flex-col items-center justify-center py-6 animate-in slide-in-from-bottom-2">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
              <p className="text-emerald-500 font-semibold text-lg">
                ¡Solicitud enviada!
              </p>
            </div>
          ) : (
            // Formulario
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                  className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3.5 text-sm text-text-main focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                />
              </div>

              {error && (
                <span className="text-red-500 text-xs font-medium px-1">
                  {error}
                </span>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full mt-2 bg-principal hover:bg-principal/90 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer duration-200 hover:scale-[1.03]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Solicitud
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Clicar fuera del modal también lo cierra */}
      <div className="absolute inset-0 -z-10" onClick={handleClose} />
    </div>
  );
};
