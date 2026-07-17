"use client";

import { useEffect, useMemo, useState } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Product } from "@/types/product";
import { getProducts, deleteProduct } from "@/services/productService";

import ProductHeader from "./ProductHeader";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );

  const [formOpen, setFormOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error("Erreur chargement produits :", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const init = async () => {
      await loadProducts();
    };

    init();
  }, []);

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    setFormOpen(true);
  }

  async function handleDelete(product: Product) {
    const confirmDelete = window.confirm(
      `Voulez-vous supprimer "${product.name}" ?`,
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(product.id);

      await loadProducts();
    } catch (error) {
      console.error("Erreur suppression :", error);

      alert("Impossible de supprimer ce produit.");
    }
  }

  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter((category): category is string => Boolean(category));

    return Array.from(new Set(uniqueCategories));
  }, [products]);
  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        (product.category ?? "").toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);
  if (loading) {
    return <div className="py-10 text-center">Chargement des produits...</div>;
  }

  return (
    <div className="space-y-6">
      <ProductHeader refreshProducts={loadProducts} products={products} />

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="all">Toutes les catégories</option>

          {categories.map((category) => (
            <option key={category} value={category ?? ""}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductForm
        key={selectedProduct?.id ?? "new"}
        product={selectedProduct}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);

          if (!open) {
            setSelectedProduct(undefined);
          }
        }}
        refreshProducts={loadProducts}
      />
    </div>
  );
}
