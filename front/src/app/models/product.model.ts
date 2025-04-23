export interface Product {
  product_id: string;
  name: string;
  price: string | number;
  main_image_url: string;
  in_wishlist: boolean;
  description: string;
  categories: string[];
}
