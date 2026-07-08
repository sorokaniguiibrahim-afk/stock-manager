"use client";

import Link from "next/link";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Produits",
    href: "/dashboard/products",
  },
  {
    name: "Entrées",
    href: "/dashboard/stock-in",
  },
  {
    name: "Sorties",
    href: "/dashboard/stock-out",
  },
  {
    name: "Fournisseurs",
    href: "/dashboard/suppliers",
  },
  {
    name: "Clients",
    href: "/dashboard/customers",
  },
  {
    name: "Rapports",
    href: "/dashboard/reports",
  },
  {
    name: "Paramètres",
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">📦 Stock Manager</h1>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-4 py-3 hover:bg-gray-800 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
