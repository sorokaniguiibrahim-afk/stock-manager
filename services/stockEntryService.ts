import { supabase } from "@/lib/supabase";

export interface StockEntryInput {
  product_id: string;
  quantity: number;
  reason: string;
  comment?: string;
}
export interface StockEntry {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  reason: string;
  comment: string | null;
  created_at: string;

  product: {
    name: string;
  } | null;
}

export async function getStockEntries(): Promise<StockEntry[]> {
  const { data, error } = await supabase
    .from("stock_entries")
    .select(
      `
      *,
      product:products(
        name
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}
export async function createStockEntry({
  product_id,
  quantity,
  reason,
  comment,
}: StockEntryInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  // 1 - Récupérer le produit
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", product_id)
    .single();

  if (productError) throw productError;

  const previousQuantity = product.quantity;

  const newQuantity = previousQuantity + quantity;

  // 2 - Mise à jour du stock
  const { error: updateError } = await supabase
    .from("products")
    .update({
      quantity: newQuantity,
    })
    .eq("id", product_id);

  if (updateError) throw updateError;

  // 3 - Enregistrer l'entrée
  const { error: entryError } = await supabase.from("stock_entries").insert({
    product_id,
    user_id: user.id,
    quantity,
    reason,
    comment,
  });

  if (entryError) throw entryError;

  // 4 - Historique mouvement
  const { error: movementError } = await supabase
    .from("stock_movements")
    .insert({
      product_id,
      user_id: user.id,
      type: "entry",
      quantity,
      previous_quantity: previousQuantity,
      new_quantity: newQuantity,
    });

  if (movementError) throw movementError;

  return {
    product,
    previousQuantity,
    newQuantity,
  };
}
