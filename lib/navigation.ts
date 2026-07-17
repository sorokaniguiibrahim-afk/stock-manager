import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  BarChart3,
  Settings,
  History as HistoryIcon,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produits",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Entrées",
    href: "/dashboard/entries",
    icon: ArrowDownToLine,
  },
  {
    title: "Sorties",
    href: "/dashboard/stock-out",
    icon: ArrowUpFromLine,
  },

  {
    title: "Rapports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Historique",
    href: "/dashboard/movements",
    icon: HistoryIcon,
  },
];
