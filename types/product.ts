export interface Product {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  purchase_price: number;
  selling_price: number;
  quantity: number;
  alert_threshold: number;
  created_at: string;
  user_id: string;
}
