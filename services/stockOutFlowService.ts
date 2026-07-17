import { supabase } from "@/lib/supabase";

export interface StockOutflowInput {
  product_id: string;
  quantity: number;
  reason: string;
  comment?: string;
}

export async function createStockOutflow({
  product_id,
  quantity,
  reason,
  comment,
}: StockOutflowInput) {
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

  // Vérification stock disponible
  if (previousQuantity < quantity) {
    throw new Error("Stock insuffisant");
  }

  const newQuantity = previousQuantity - quantity;

  // 2 - Mise à jour du stock
  const { error: updateError } = await supabase
    .from("products")
    .update({
      quantity: newQuantity,
    })
    .eq("id", product_id);

  if (updateError) throw updateError;

  // 3 - Enregistrer la sortie
  const { error: outflowError } = await supabase.from("stock_outflows").insert({
    product_id,
    user_id: user.id,
    quantity,
    reason,
    comment,
  });

  if (outflowError) throw outflowError;

  // 4 - Historique mouvement
  const { error: movementError } = await supabase
    .from("stock_movements")
    .insert({
      product_id,
      user_id: user.id,
      type: "UPDATE",
      quantity,
      previous_quantity: previousQuantity,
      new_quantity: newQuantity,
    });

  if (movementError) throw movementError;

  return true;
}
