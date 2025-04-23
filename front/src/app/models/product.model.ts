export interface Product {
  product_id: string;
  name: string;
  price: string | number;
  main_image_url: string;
  in_wishlist: boolean;
  description: string;
  categories: string[];
}

export interface ProductVariant {
  product_variant_id: string;
  size : string;
  color : string;
  stock : number;
  price : number;
}

export interface ProductDetail {
  product_id:number;
  name: string;
  description: string;
  price: string | number;
  main_image_url: string;
  in_wishlist: boolean;
  categories: string[];
  image_urls : string[];
  variants : ProductVariant[],
}
