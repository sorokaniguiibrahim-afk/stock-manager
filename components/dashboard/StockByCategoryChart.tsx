"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface StockCategory {
  category: string;
  quantity: number;
}

interface StockByCategoryChartProps {
  data: StockCategory[];
}

export default function StockByCategoryChart({
  data,
}: StockByCategoryChartProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Stock par catégorie</h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="quantity" name="Quantité" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
