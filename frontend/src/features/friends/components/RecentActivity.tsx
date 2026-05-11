import React from "react";

const actividadData = [
  {
    id: 1,
    text: (
      <>
        <span className="font-semibold text-white">Sofía Vargas</span> pagó su
        parte de "Regalo de Boda"
      </>
    ),
    time: "Ayer, 18:30",
    dotColor: "bg-emerald-500",
  },
  {
    id: 2,
    text: (
      <>
        Añadiste a <span className="font-semibold text-white">Miguel Ríos</span>{" "}
        a tus amigos
      </>
    ),
    time: "Hace 2 días",
    dotColor: "bg-indigo-500",
  },
  {
    id: 3,
    text: (
      <>
        Añadiste a <span className="font-semibold text-white">Miguel Ríos</span>{" "}
        a tus amigos
      </>
    ),
    time: "Hace 2 días",
    dotColor: "bg-indigo-500",
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-[#1A1C23] border border-white/5 rounded-2xl p-6 shadow-xl h-fit w-full">
      <h2 className="text-lg font-bold text-white tracking-wide mb-6">
        Actividad Reciente
      </h2>

      {/* Contenedor del Timeline */}
      <div className="relative">
        {/* Línea vertical de fondo */}
        <div className="absolute top-2 bottom-2 left-[3.5px] w-px bg-white/10"></div>

        <div className="flex flex-col gap-6">
          {actividadData.map((item) => (
            <div key={item.id} className="relative flex gap-4">
              {/* Punto del timeline */}
              <div
                className={`w-2 h-2 rounded-full mt-1.5 relative z-10 ring-4 ring-[#1A1C23] ${item.dotColor}`}
              ></div>

              {/* Texto y Hora */}
              <div>
                <p className="text-sm text-gray-300 leading-snug">
                  {item.text}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
