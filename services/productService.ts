import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}
export async function createProduct(product: {
  name: string;
  category: string;
  description: string;
  purchase_price: number;
  selling_price: number;
  quantity: number;
  alert_threshold: number;
}) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
