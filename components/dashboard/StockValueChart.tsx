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

interface StockValue {
  category: string;
  value: number;
}

interface Props {
  data: StockValue[];
}

export default function StockValueChart({ data }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Valeur du stock par catégorie
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip
              formatter={(value) => `${Number(value).toLocaleString()} FCFA`}
            />

            <Bar dataKey="value" name="Valeur" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
