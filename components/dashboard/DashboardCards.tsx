"use client";

import {
  Package,
  DollarSign,
  AlertTriangle,
  XCircle,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

interface DashboardCardsProps {
  totalProducts: number;
  stockValue: number;
  lowStock: number;
  outOfStock: number;
  potentialProfit: number;
}

export default function DashboardCards({
  totalProducts,
  stockValue,
  lowStock,
  outOfStock,
  potentialProfit,
}: DashboardCardsProps) {
  const cards = [
    {
      title: "Produits",
      value: totalProducts,
      icon: Package,
      style:
        "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300",
    },

    {
      title: "Valeur du stock",
      value: `${stockValue.toLocaleString()} FCFA`,
      icon: DollarSign,
      style:
        "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 text-green-700 dark:text-green-300",
    },

    {
      title: "Stock faible",
      value: lowStock,
      icon: AlertTriangle,
      style:
        lowStock > 0
          ? "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300"
          : "bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-900 text-gray-700 dark:text-gray-300",
    },

    {
      title: "Rupture",
      value: outOfStock,
      icon: XCircle,
      style:
        outOfStock > 0
          ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-700 dark:text-red-300"
          : "bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-900 text-gray-700 dark:text-gray-300",
    },

    {
      title: "Bénéfice potentiel",
      value: `${(potentialProfit ?? 0).toLocaleString()} FCFA`,
      icon: TrendingUp,
      style:
        "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.02,
            }}
            className={`
              rounded-xl
              border
              p-6
              shadow-sm
              transition
              ${card.style}
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{card.title}</p>

                <h2 className="mt-2 text-2xl font-bold">{card.value}</h2>
              </div>

              <Icon className="h-8 w-8 shrink-0 opacity-80" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
