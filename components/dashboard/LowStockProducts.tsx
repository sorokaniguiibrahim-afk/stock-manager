"use client";

import { DashboardProduct } from "@/services/dashboardService";
import { AlertTriangle, XCircle } from "lucide-react";

interface LowStockProductsProps {
  products: DashboardProduct[];
}

export default function LowStockProducts({ products }: LowStockProductsProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />

        <h2 className="text-xl font-semibold">Alertes stock</h2>
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground">Aucun produit en alerte.</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold">{product.name}</p>

                <p className="text-sm text-muted-foreground">
                  Catégorie : {product.category}
                </p>

                <p className="text-sm">
                  Stock : {product.quantity}
                  {" / "}
                  Seuil : {product.alert_threshold}
                </p>
              </div>

              {product.status === "critical" ? (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  Rupture
                </div>
              ) : (
                <div className="rounded-md bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                  Stock faible
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
