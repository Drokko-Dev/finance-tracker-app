import { useRef, useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useFriendStats } from "../hooks/useFriendStatus";
import { AddFriendModal } from "./AddFriendModal";
import { Link } from "react-router-dom";

export const QuickAccess = () => {
  const { friends, isFriendsLoading } = useFriendStats();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timeout = setTimeout(() => {
      handleScroll();
    }, 50);

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(container);
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="bg-card-bg border border-border-subtle rounded-3xl p-6 shadow-xl w-full relative group transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-text-main tracking-wide">
            Acceso Rápido
          </h2>
          <Link
            to={"/movimientos"}
            className="text-sm text-text-subtle hover:text-text-main transition-colors flex items-center gap-1 group/link cursor-pointer"
          >
            Ver todos
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- BOTÓN NAVEGACIÓN IZQUIERDA --- */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-[45%] z-20 w-10 h-10 rounded-full bg-card-bg border border-border-subtle shadow-md flex items-center justify-center text-text-subtle hover:text-principal hover:border-principal/50 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* --- BOTÓN NAVEGACIÓN DERECHA --- */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-[45%] z-20 w-10 h-10 rounded-full bg-card-bg border border-border-subtle shadow-md flex items-center justify-center text-text-subtle hover:text-principal hover:border-principal/50 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative overflow-x-auto flex items-center gap-6 pr-6 -mx-1 px-1 pb-3 pt-1 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            maskImage: `linear-gradient(to right, 
            ${showLeftArrow ? "transparent" : "black"} 0%, 
            black 10%, 
            black 90%, 
            ${showRightArrow ? "transparent" : "black"} 100%)`,
            WebkitMaskImage: `linear-gradient(to right, 
            ${showLeftArrow ? "transparent" : "black"} 0%, 
            black 10%, 
            black 90%, 
            ${showRightArrow ? "transparent" : "black"} 100%)`,
          }}
        >
          {/* BOTÓN NUEVO */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center gap-2.5 w-16 flex-shrink-0 cursor-pointer group/btn"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-border-subtle flex items-center justify-center bg-card-bg group-hover/btn:border-principal group-hover/btn:bg-principal/5 transition-all">
              <Plus className="w-6 h-6 text-text-subtle group-hover/btn:text-principal transition-colors" />
            </div>
            <span className="text-[11px] font-semibold text-text-subtle group-hover/btn:text-principal transition-colors truncate w-full text-center">
              Nuevo
            </span>
          </div>

          {/* LISTA DE AMIGOS/CONTACTOS */}
          {isFriendsLoading ? (
            <span className="text-text-subtle text-sm font-medium">
              Cargando amigos...
            </span>
          ) : (
            friends?.map((friend) => (
              <div
                key={friend.id}
                className="flex flex-col items-center gap-2.5 w-17 flex-shrink-0 cursor-pointer group/avatar py-2"
              >
                <div className="relative">
                  {friend.avatar ? (
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-15 h-15 rounded-full object-cover ring-2 ring-transparent group-hover/avatar:ring-principal/40 transition-all duration-300 group-hover/avatar:scale-110 shadow-sm"
                    />
                  ) : (
                    <div
                      className={`w-15 h-15 rounded-full flex items-center justify-center text-sm font-black text-white ring-2 ring-transparent group-hover/avatar:ring-principal/40 transition-all duration-300 group-hover/avatar:scale-110 shadow-sm ${friend.bgColor}`}
                    >
                      {friend.initials}
                    </div>
                  )}
                </div>
                <span
                  title={friend.name}
                  className="text-[11px] font-semibold text-text-subtle group-hover/avatar:text-text-main transition-colors truncate w-full text-center"
                >
                  {friend.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <AddFriendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
