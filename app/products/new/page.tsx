"use client";

import { useState } from "react";
import { createProduct } from "@/services/productService";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    purchase_price: 0,
    selling_price: 0,
    quantity: 0,
    alert_threshold: 5,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createProduct({
      ...form,
      purchase_price: Number(form.purchase_price),
      selling_price: Number(form.selling_price),
      quantity: Number(form.quantity),
      alert_threshold: Number(form.alert_threshold),
    });

    router.push("/products");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Ajouter un produit</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="name"
          placeholder="Nom du produit"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Catégorie"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="purchase_price"
          type="number"
          placeholder="Prix achat"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="selling_price"
          type="number"
          placeholder="Prix vente"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantité"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>
    </main>
  );
}
