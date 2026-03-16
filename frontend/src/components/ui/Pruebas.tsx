export const MiPrimerComponente = () => {
  return (
    // 1. Un contenedor con fondo blanco, bordes redondeados y sombra
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-sm">
      {/* 2. Un título grande y negrita */}
      <h2 className="text-2xl font-bold text-slate-800">Hola Jaime</h2>

      {/* 3. Un texto gris con margen arriba */}
      <p className="text-slate-500 mt-2">
        Estás aprendiendo Tailwind paso a paso.
      </p>

      {/* 4. Un botón con tu color de acento (cian) */}
      <button className="mt-6 bg-cyan-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-cyan-600 transition-colors cursor-pointer">
        Empezar
      </button>
    </div>
  );
};
