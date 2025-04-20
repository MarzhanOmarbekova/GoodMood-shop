# E-commerce API

This project provides an API for an e-commerce system, allowing users to browse products, view product details, and manage wishlists. The API is built using Django and Django REST Framework.

---

## Features

- **Product List**: Retrieve a list of all available products, with a flag indicating whether each product is in the authenticated user's wishlist (`in_wishlist`).
- **Product Details**: View details of a single product, including its variants (such as size, color, price, and stock), and a flag indicating if the product is in the wishlist (`in_wishlist`).
- **Wishlist Management**:
  - Retrieve the wishlist of the authenticated user.
  - Add products to the wishlist.
  - Remove products from the wishlist.

---

## Endpoints

### **Product Endpoints**

#### 1. List All Products
- **URL**: `/api/products/`
- **Method**: `GET`
- **Description**: Retrieves a list of all products. For authenticated users, includes a flag `in_wishlist` to indicate if the product is in their wishlist.
- **Permission**: Public (no authentication required).
- **Response Example**:
    ```json
    [
        {
            "product_id": 1,
            "name": "Smartphone",
            "price": 699.99,
            "main_image_url": "http://example.com/image.jpg",
            "description": "Latest model smartphone",
            "categories": ["Electronics"],
            "in_wishlist": true
        },
        {
            "product_id": 2,
            "name": "Laptop",
            "price": 1200.00,
            "main_image_url": "http://example.com/laptop.jpg",
            "description": "High-performance laptop",
            "categories": ["Electronics"],
            "in_wishlist": false
        }
    ]
    ```

#### 2. Retrieve Product Details
- **URL**: `/api/products/<product_id>/`
- **Method**: `GET`
- **Description**: Retrieves details of a specific product, including its variants (sizes, colors, prices, and stock). For authenticated users, includes a flag `in_wishlist` to indicate if the product is in their wishlist.
- **Permission**: Public (no authentication required).
- **Response Example**:
    ```json
    {
        "product_id": 1,
        "name": "Smartphone",
        "description": "Latest model smartphone",
        "price": 699.99,
        "main_image_url": "http://example.com/image.jpg",
        "categories": ["Electronics"],
        "image_urls": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
        "variants": [
            {
                "product_variant_id": 1,
                "size": "Medium",
                "color": "Red",
                "stock": 50,
                "price": 25.99
            }
        ],
        "in_wishlist": true
    }
    ```

---

### **Wishlist Endpoints**

#### 1. Retrieve Wishlist
- **URL**: `/api/wishlist/`
- **Method**: `GET`
- **Description**: Retrieves the wishlist of the authenticated user. Each product includes the `in_wishlist` flag, which will always be `true` for items in the wishlist.
- **Permission**: Requires authentication.
- **Response Example**:
    ```json
    [
        {
            "products": [
                {
                    "product_id": 1,
                    "name": "Meyer Inc Pants",
                    "price": "187.35",
                    "main_image_url": "https://picsum.photos/136/325",
                    "in_wishlist": true,
                    "description": "Simple apply girl reveal eye enjoy appear. Serious she simple free agree remember seven.\nAmong high require entire write it service. Kind bring edge something he go.",
                    "categories": [
                        "Men"
                    ]
                }
            ]
        }
    ]
    ```

#### 2. Add Product to Wishlist
- **URL**: `/api/wishlist/`
- **Method**: `POST`
- **Description**: Adds a product to the authenticated user's wishlist.
- **Permission**: Requires authentication.
- **Request Example**:
    ```json
    {
        "product_id": 1
    }
    ```
- **Response Example**:
    ```json
    {
        "message": "Product added to wishlist."
    }
    ```

#### 3. Remove Product from Wishlist
- **URL**: `/api/wishlist/`
- **Method**: `DELETE`
- **Description**: Removes a product from the authenticated user's wishlist.
- **Permission**: Requires authentication.
- **Request Example**:
    ```json
    {
        "product_id": 1
    }
    ```
- **Response Example**:
    ```json
    {
        "message": "Product removed from wishlist."
    }
    ```

---