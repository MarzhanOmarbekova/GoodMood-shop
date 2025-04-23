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
  additional_images: string[];
}

export interface Category {
  id: string;
  name: string;
  code: string;
}
