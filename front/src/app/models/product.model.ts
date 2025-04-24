export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  main_image_url: string;
  category: string;
  in_wishlist?: boolean;
}

export interface ProductVariant {
  product_variant_id: number;
  size: string;
  color: string;
  stock: number;
  price: number;
}

export interface ProductDetail extends Product {
  variants: ProductVariant[];
  images: string[];
  rating?: number;
  review_count?: number;
  details?: string[];
  care_instructions?: string[];
  image_urls: string[];
}

export interface Category {
  id: string;
  name: string;
  code: string;
}
