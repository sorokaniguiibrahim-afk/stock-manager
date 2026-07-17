import { supabase } from "@/lib/supabase";

export interface DashboardProduct {
  id: string;
  name: string;
  category: string;
  quantity: number;
  purchase_price: number;
  selling_price: number;
  alert_threshold: number;
  created_at: string;
  status?: "critical" | "warning";
}

export interface CategoryStock {
  category: string;
  quantity: number;
}

export interface DashboardStats {
  totalProducts: number;
  stockValue: number;
  lowStock: number;
  outOfStock: number;
  potentialProfit: number;
  lowStockProducts: DashboardProduct[];
  recentProducts: DashboardProduct[];
  stockByCategory: CategoryStock[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data: products, error } = await supabase.from("products").select(`
      id,
      name,
      category,
      quantity,
      purchase_price,
      selling_price,
      alert_threshold,
      created_at
    `);

  if (error) {
    console.error("Erreur dashboard :", error);
    throw error;
  }

  const safeProducts: DashboardProduct[] = products ?? [];

  /*
   * Nombre total de produits
   */
  const totalProducts = safeProducts.length;

  /*
   * Valeur totale du stock
   */
  const stockValue = safeProducts.reduce(
    (total, product) => total + product.quantity * product.purchase_price,
    0,
  );

  /*
   * Bénéfice potentiel
   */
  const potentialProfit = safeProducts.reduce(
    (total, product) =>
      total +
      (product.selling_price - product.purchase_price) * product.quantity,
    0,
  );

  /*
   * Produits en alerte
   */
  const lowStockProducts: DashboardProduct[] = safeProducts
    .filter((product) => product.quantity <= product.alert_threshold)
    .map((product) => ({
      ...product,
      status:
        product.quantity === 0 ? ("critical" as const) : ("warning" as const),
    }));

  /*
   * Nombre de produits en stock faible
   */
  const lowStock = lowStockProducts.filter(
    (product) => product.quantity > 0,
  ).length;

  /*
   * Nombre de ruptures
   */
  const outOfStock = lowStockProducts.filter(
    (product) => product.quantity === 0,
  ).length;

  /*
   * Répartition du stock par catégorie
   */
  const categoryMap: Record<string, number> = {};

  safeProducts.forEach((product) => {
    const category = product.category || "Sans catégorie";

    categoryMap[category] = (categoryMap[category] ?? 0) + product.quantity;
  });

  const stockByCategory: CategoryStock[] = Object.entries(categoryMap).map(
    ([category, quantity]) => ({
      category,
      quantity,
    }),
  );

  /*
   * 5 derniers produits ajoutés
   */
  const recentProducts = [...safeProducts]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return {
    totalProducts,
    stockValue,
    lowStock,
    outOfStock,
    potentialProfit,
    lowStockProducts,
    recentProducts,
    stockByCategory,
  };
}
