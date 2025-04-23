export interface CartItem {
  product_id: number;
  product_variant_id: number;
  product_name: string;
  product_description: string;
  product_main_image: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  quantity: number;
  item_total_price: number;
  categories: string[];
}

export interface CartResponse {
  cart_items: CartItem[];
  total_price: number;
}
