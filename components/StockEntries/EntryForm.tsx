"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Product } from "@/types/product";
import { getProducts } from "@/services/productService";
import { createStockEntry } from "@/services/stockEntryService";

interface EntryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refreshEntries: () => Promise<void>;
}

export default function EntryForm({
  open,
  onOpenChange,
  refreshEntries,
}: EntryFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("Achat");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  /*
    Charger les produits
  */
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      setProducts(data);
    }

    if (open) {
      loadProducts();
    }
  }, [open]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Veuillez sélectionner un produit.");
      return;
    }

    if (quantity <= 0) {
      alert("La quantité doit être supérieure à 0.");
      return;
    }

    try {
      setLoading(true);

      await createStockEntry({
        product_id: selectedProduct.id,
        quantity,
        reason,
        comment,
      });

      await refreshEntries();

      onOpenChange(false);

      setSelectedProduct(null);
      setQuantity(0);
      setReason("Achat");
      setComment("");
      setSearch("");
    } catch (error) {
      console.error(error);

      alert("Erreur lors de la création de l'entrée.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle entrée stock</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Recherche produit */}
          <div>
            <Label>Produit</Label>

            <Input
              placeholder="🔍 Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && !selectedProduct && (
              <div className="mt-2 rounded-lg border bg-background">
                {filteredProducts.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-muted"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <span>{product.name}</span>

                    <span className="text-xs text-muted-foreground">
                      Stock : {product.quantity}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {selectedProduct && (
              <div className="mt-2 rounded-lg border bg-muted/40 p-3">
                <p className="font-medium">{selectedProduct.name}</p>

                <p className="text-sm text-muted-foreground">
                  Stock actuel : {selectedProduct.quantity}
                </p>
              </div>
            )}
          </div>

          {/* Quantité */}
          <div>
            <Label>Quantité reçue</Label>

            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Motif */}
          <div>
            <Label>Motif</Label>

            <select
              className="w-full rounded-md border px-3 py-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option>Achat</option>

              <option>Retour</option>

              <option>Correction</option>
            </select>
          </div>

          {/* Commentaire */}
          <div>
            <Label>Commentaire</Label>

            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ex: livraison fournisseur..."
            />
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Enregistrement..." : "Ajouter l'entrée"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
