"use client";

import { DashboardProduct } from "@/services/dashboardService";

interface RecentProductsProps {
  products: DashboardProduct[];
}

export default function RecentProducts({ products }: RecentProductsProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        📦 Derniers produits ajoutés
      </h2>

      {products.length === 0 ? (
        <p className="text-muted-foreground">Aucun produit récent.</p>
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
                  {product.category}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {product.selling_price.toLocaleString()} FCFA
                </p>

                <p className="text-sm">Stock : {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
