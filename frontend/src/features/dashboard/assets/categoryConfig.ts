import React from "react";
import {
  ShoppingBag,
  Car,
  Home,
  HeartPulse,
  Gamepad2,
  Dog,
  Tag,
  Calendar,
  MoreHorizontal,
  Briefcase,
  PiggyBank,
} from "lucide-react";

export const categoryConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  Alimentos: {
    icon: ShoppingBag,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  Transporte: {
    icon: Car,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  Hogar: {
    icon: Home,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  Salud: {
    icon: HeartPulse,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
  Ocio: {
    icon: Gamepad2,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
  },
  Mascotas: {
    icon: Dog,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  Compras: {
    icon: Tag,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  Fijos: {
    icon: Calendar,
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    border: "border-slate-400/20",
  },
  Otros: {
    icon: MoreHorizontal,
    color: "text-gray-400",
    bg: "bg-gray-400/10",
    border: "border-gray-400/20",
  },
  Ingreso: {
    icon: Briefcase,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  Ahorro: {
    icon: PiggyBank,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20",
  },
};
