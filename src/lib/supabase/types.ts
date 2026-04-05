export type ProductStatus = "draft" | "active" | "archived";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "returned";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type CampaignType = "email" | "social" | "ad" | "influencer";
export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Concern {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  color: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  images: string[] | null;
  badge: string | null;
  category_id: string | null;
  is_best_seller: boolean;
  is_new_launch: boolean;
  is_combo: boolean;
  stock_quantity: number;
  low_stock_threshold: number;
  rating: number | null;
  review_count: number;
  sold_count: string | null;
  variant_label: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
  category?: Category;
  concerns?: Concern[];
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  total_orders: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: number;
  customer_id: string | null;
  status: OrderStatus;
  payment_method: string | null;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping_fee: number;
  discount: number;
  total: number;
  shipping_address: Record<string, string> | null;
  tracking_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface InventoryLog {
  id: string;
  product_id: string;
  change_qty: number;
  reason: string;
  created_at: string;
  product?: Product;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  budget: number;
  spent: number;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  results: Record<string, unknown> | null;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_slug: string;
  title: string;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  updated_at: string;
}

export interface AdminActivityLog {
  id: string;
  admin_email: string;
  action: string;
  details: string | null;
  created_at: string;
}
