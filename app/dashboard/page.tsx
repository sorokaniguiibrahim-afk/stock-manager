"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardCards from "@/components/dashboard/DashboardCards";
import LowStockProducts from "@/components/dashboard/LowStockProducts";
import StockByCategoryChart from "@/components/dashboard/StockByCategoryChart";
import RecentProducts from "@/components/dashboard/RecentProducts";

import { getDashboardStats, DashboardStats } from "@/services/dashboardService";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    stockValue: 0,
    lowStock: 0,
    outOfStock: 0,
    potentialProfit: 0,
    lowStockProducts: [],
    recentProducts: [],
    stockByCategory: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.error("Erreur chargement dashboard :", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="py-10 text-center"
      >
        Chargement du dashboard...
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="space-y-6"
    >
      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">Vue générale de votre stock.</p>
      </motion.div>

      {/* CARTES KPI */}

      <DashboardCards
        totalProducts={stats.totalProducts}
        stockValue={stats.stockValue}
        lowStock={stats.lowStock}
        outOfStock={stats.outOfStock}
        potentialProfit={stats.potentialProfit}
      />

      {/* GRAPHIQUE */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 0.5,
        }}
      >
        <StockByCategoryChart data={stats.stockByCategory} />
      </motion.div>

      {/* ALERTES STOCK */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}
      >
        <LowStockProducts products={stats.lowStockProducts} />
      </motion.div>

      {/* PRODUITS RECENTS */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.7,
          duration: 0.5,
        }}
      >
        <RecentProducts products={stats.recentProducts} />
      </motion.div>
    </motion.div>
  );
}
