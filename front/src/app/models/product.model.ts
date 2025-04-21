export interface Product {
  id: number
  name: string;
  price: number;
  main_image_url: string;
  description: string;
  categories: string[];
  in_wishlist: boolean;
}
