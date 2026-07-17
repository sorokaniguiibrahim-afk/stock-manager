"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/services/productService";
import { Product } from "@/types/product";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refreshProducts: () => Promise<void>;
  product?: Product;
}
const initialForm = {
  name: "",
  category: "",
  description: "",
  purchase_price: 0,
  selling_price: 0,
  quantity: 0,
  alert_threshold: 5,
};

export default function ProductForm({
  open,
  onOpenChange,
  refreshProducts,
  product,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          category: product.category ?? "",
          description: product.description ?? "",
          purchase_price: product.purchase_price,
          selling_price: product.selling_price,
          quantity: product.quantity,
          alert_threshold: product.alert_threshold,
        }
      : initialForm,
  );

  /*
    Pré-remplissage en mode modification
  */

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        name.includes("price") ||
        name === "quantity" ||
        name === "alert_threshold"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      /*
        Mode modification
      */
      if (product) {
        await updateProduct(product.id, form);
      } else {
        /*
        Mode création
      */
        await createProduct(form);
      }

      await refreshProducts();

      onOpenChange(false);

      setForm(initialForm);
    } catch (error) {
      console.error("Erreur produit :", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          setForm(initialForm);
        }

        onOpenChange(value);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product ? "Modifier le produit" : "Ajouter un produit"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>

            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie</Label>

            <Input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Prix achat</Label>

              <Input
                type="number"
                name="purchase_price"
                value={form.purchase_price}
                onChange={handleChange}
                disabled={loading}
                min={0}
              />
            </div>

            <div>
              <Label>Prix vente</Label>

              <Input
                type="number"
                name="selling_price"
                value={form.selling_price}
                onChange={handleChange}
                disabled={loading}
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {!product ? (
              <div>
                <Label>Quantité initiale</Label>

                <Input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  disabled={loading}
                  min={0}
                />
              </div>
            ) : (
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-sm font-medium">
                  Stock actuel : {product.quantity}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Le stock ne peut plus être modifié ici. Utilisez le module
                  Entrées, Sorties ou Ajustement de stock.
                </p>
              </div>
            )}

            <div>
              <Label>Seuil d&apos;alerte</Label>

              <Input
                type="number"
                name="alert_threshold"
                value={form.alert_threshold}
                onChange={handleChange}
                disabled={loading}
                min={0}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? "Enregistrement..."
              : product
                ? "Modifier le produit"
                : "Créer le produit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
