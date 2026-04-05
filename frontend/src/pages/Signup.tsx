import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/apiClient"; // Ajusta la ruta si es necesario
import {
  Wallet,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Loader2,
} from "lucide-react";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Llamamos a la ruta de registro
      await apiClient.post("/api/v1/users/", {
        name,
        email,
        password,
      });

      // Si es exitoso, lo enviamos a iniciar sesión
      navigate("/login");
    } catch (err: any) {
      // Capturamos el error 400 (ej: correo ya registrado)
      console.log("El backend se queja de:", err.response?.data);
      if (err.response?.status === 400) {
        setError(err.response.data.detail || "Error en el registro");
      } else {
        setError("Ocurrió un error al intentar crear la cuenta");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a] p-4">
      {/* Resplandores de fondo */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="relative p-8 rounded-3xl bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4 shadow-inner">
              <Wallet className="text-blue-400 w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Crea tu cuenta
            </h1>
            <p className="text-gray-400 text-sm">
              Comienza a gestionar tus finanzas
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 pl-1">
                Nombre
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#111111] border border-[var(--color-border-subtle)] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 pl-1">
                Correo Electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#111111] border border-[var(--color-border-subtle)] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 pl-1">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#111111] border border-[var(--color-border-subtle)] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Registrarse
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Link para volver al login */}
            <p className="text-center text-sm text-gray-400 mt-4">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
