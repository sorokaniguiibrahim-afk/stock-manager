import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { createStockMovement } from "./stockMovementService";

/* ===========================
   Type utilisé pour les formulaires
=========================== */

export type ProductInput = {
  name: string;
  category: string;
  description: string;
  purchase_price: number;
  selling_price: number;
  quantity: number;
  alert_threshold: number;
};

/* ===========================
   Récupérer tous les produits
=========================== */

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}

/* ===========================
   Récupérer un produit
=========================== */

export async function getProductById(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

/* ===========================
   Créer un produit
=========================== */

export async function createProduct(product: ProductInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  await createStockMovement({
    product_id: data.id,
    type: "CREATE",
    quantity: data.quantity,
    previous_quantity: 0,
    new_quantity: data.quantity,
  });

  return data;
}

/* ===========================
   Modifier un produit
=========================== */

export async function updateProduct(
  id: string,
  product: Partial<ProductInput>,
) {
  // Récupère le produit avant modification
  const { data: oldProduct, error: oldError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (oldError) throw oldError;

  // Met à jour le produit
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  // Enregistre un mouvement seulement si la quantité a changé
  if (
    product.quantity !== undefined &&
    product.quantity !== oldProduct.quantity
  ) {
    await createStockMovement({
      product_id: id,
      type: "UPDATE",
      quantity: Math.abs(product.quantity - oldProduct.quantity),
      previous_quantity: oldProduct.quantity,
      new_quantity: product.quantity,
    });
  }

  return data;
}

/* ===========================
   Supprimer un produit
=========================== */

export async function deleteProduct(id: string) {
  // Récupère le produit avant suppression
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  // Enregistre le mouvement
  await createStockMovement({
    product_id: product.id,
    type: "DELETE",
    quantity: product.quantity,
    previous_quantity: product.quantity,
    new_quantity: 0,
  });

  // Supprime le produit
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw error;
}

/* ===========================
   Vérifier si un produit existe
=========================== */

export async function productExists(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("products")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}
