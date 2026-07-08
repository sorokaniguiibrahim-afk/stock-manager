"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p className="p-8">Chargement...</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Produits</h1>

      {products.length === 0 ? (
        <p className="mt-5 text-gray-500">Aucun produit enregistré.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-4">
              <h2 className="font-bold">{product.name}</h2>

              <p>Catégorie : {product.category}</p>

              <p>Stock : {product.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
