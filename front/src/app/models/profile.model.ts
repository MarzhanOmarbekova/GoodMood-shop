export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  orders: Order[];
  wishlist: WishlistItem[];
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface WishlistItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  main_image_url: string;
} 