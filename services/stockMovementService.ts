import { supabase } from "@/lib/supabase";

export type MovementType = "CREATE" | "UPDATE" | "DELETE";

interface CreateMovementParams {
  product_id: string;
  type: MovementType;
  quantity: number;
  previous_quantity: number;
  new_quantity: number;
}

/* ============================
   Créer un mouvement
============================ */

export async function createStockMovement({
  product_id,
  type,
  quantity,
  previous_quantity,
  new_quantity,
}: CreateMovementParams) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  const { error } = await supabase.from("stock_movements").insert({
    product_id,
    user_id: user.id,
    type,
    quantity,
    previous_quantity,
    new_quantity,
  });

  if (error) throw error;
}

/* ============================
   Types pour l'historique
============================ */

export interface StockMovement {
  id: string;
  type: MovementType;
  quantity: number;
  previous_quantity: number;
  new_quantity: number;
  created_at: string;

  product: {
    name: string;
    category: string | null;
  }[];

  profile: {
    email: string;
  }[];
}

/* ============================
   Récupérer les mouvements
============================ */

export async function getStockMovements(): Promise<StockMovement[]> {
  const { data, error } = await supabase
    .from("stock_movements")
    .select(
      `
      *,
      product:products(
        name,
        category
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    throw error;
  }

  return data ?? [];
}
