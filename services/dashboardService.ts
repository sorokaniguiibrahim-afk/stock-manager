import { supabase } from "@/lib/supabase";

export async function getDashboardStats() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) throw error;

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const lowStock = products.filter((product) => product.quantity <= 5).length;

  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return {
    totalProducts,
    totalValue,
    lowStock,
    recentProducts,
  };
}
