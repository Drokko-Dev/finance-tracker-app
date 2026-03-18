export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-50">
      {/* El Spinner */}
      <div className="relative">
        {/* Círculo de fondo (estático) */}
        <div className="w-12 h-12 border-4 border-slate-200 rounded-full"></div>
        {/* Círculo animado (el que gira) */}
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      
      {/* Texto opcional */}
      <span className="mt-4 text-slate-600 font-medium animate-pulse">
        Cargando sistema...
      </span>
    </div>
  );
};