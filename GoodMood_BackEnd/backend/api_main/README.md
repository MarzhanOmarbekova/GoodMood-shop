# E-commerce API

This project provides an API for an e-commerce system, allowing users to browse products, view product details, and manage wishlists. The API is built using Django and Django REST Framework.

---

## Features

- **Product List**: Retrieve a list of all available products.
- **Product Details**: View details of a single product, including its variants (such as size, color, and price).
- **Wishlist Management**:
  - Retrieve the wishlist of the authenticated user.
  - Add product variants to the wishlist.
  - Remove product variants from the wishlist.

---

## Endpoints

### **Product Endpoints**

#### 1. List All Products
- **URL**: `/api/products/`
- **Method**: `GET`
- **Description**: Retrieves a list of all products.
- **Permission**: Public (no authentication required).
- **Response Example**:
    ```json
    [
        {
            "product_id": 1,
            "name": "Smartphone",
            "description": "Latest model smartphone",
            "price": 699.99,
            "categories": {
                "category_id": 1,
                "name": "Electronics",
                "description": "Devices and gadgets"
            },
            "main_image_url": "http://example.com/image.jpg",
            "image_urls": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
            "created_at": "2025-04-01T12:00:00Z",
            "updated_at": "2025-04-10T15:00:00Z",
            "variants": [
                {
                    "product_variant_id": 1,
                    "size": {
                        "size_id": 1,
                        "name": "Medium",
                        "description": "Medium size for products"
                    },
                    "color": "Red",
                    "price": 25.99,
                    "stock": 50
                }
            ]
        }
    ]
    ```

#### 2. Retrieve Product Details
- **URL**: `/api/products/<product_id>/`
- **Method**: `GET`
- **Description**: Retrieves details of a specific product, including its variants (sizes, colors, prices, and stock).
- **Permission**: Public (no authentication required).
- **Response Example**:
    ```json
    {
        "product_id": 1,
        "name": "Smartphone",
        "description": "Latest model smartphone",
        "price": 699.99,
        "categories": {
            "category_id": 1,
            "name": "Electronics",
            "description": "Devices and gadgets"
        },
        "main_image_url": "http://example.com/image.jpg",
        "image_urls": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
        "created_at": "2025-04-01T12:00:00Z",
        "updated_at": "2025-04-10T15:00:00Z",
        "variants": [
            {
                "id": 1,
                "size": "Medium",
                "color": "Red",
                "price": 25.99,
                "stock": 50
            }
        ]
    }
    ```

---

### **Wishlist Endpoints**

#### 1. Retrieve Wishlist
- **URL**: `/api/wishlist/`
- **Method**: `GET`
- **Description**: Retrieves the wishlist of the authenticated user.
- **Permission**: Requires authentication.
- **Response Example**:
    ```json
    [
        {
            "wishlist_id": 1,
            "name": "My Wishlist",
            "product_variants": [
                {
                    "product_variant_id": 1,
                    "size": {
                        "size_id": 1,
                        "name": "Medium",
                        "description": "Medium size for products"
                    },
                    "color": "Red",
                    "price": 25.99,
                    "stock": 50
                }
            ],
            "created_at": "2025-04-12T08:00:00Z",
            "updated_at": "2025-04-13T14:30:00Z"
        }
    ]
    ```

#### 2. Add Product Variant to Wishlist
- **URL**: `/api/wishlist/`
- **Method**: `POST`
- **Description**: Adds a product variant to the authenticated user's wishlist.
- **Permission**: Requires authentication.
- **Request Example**:
    ```json
    {
        "product_variant_id": 1
    }
    ```
- **Response Example**:
    ```json
    {
        "message": "Product variant added to wishlist."
    }
    ```

#### 3. Remove Product Variant from Wishlist
- **URL**: `/api/wishlist/`
- **Method**: `DELETE`
- **Description**: Removes a product variant from the authenticated user's wishlist.
- **Permission**: Requires authentication.
- **Request Example**:
    ```json
    {
        "product_variant_id": 1
    }
    ```
- **Response Example**:
    ```json
    {
        "message": "Product variant removed from wishlist."
    }
    ```

---

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/ecommerce-api.git
    cd ecommerce-api
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations:
    ```bash
    python manage.py migrate
    ```

4. Run the development server:
    ```bash
    python manage.py runserver
    ```

5. Access the API at `http://127.0.0.1:8000/api/`.

---

## Authentication

- The `Wishlist` endpoints require authentication.
- Use token-based authentication (e.g., via `Authorization: Token <your-token>` in request headers).

---

## Models Overview

### Product
- Represents a product in the system.
- Fields: `name`, `description`, `price`, `categories`, `main_image_url`, `image_urls`, `variants`.

### ProductVariant
- Represents a specific variant of a product (e.g., size, color).
- Fields: `product`, `size`, `color`, `price`, `stock`.

### WishList
- Represents a wishlist for a user.
- Fields: `user`, `product_variants`, `name`.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit:
    ```bash
    git commit -m "Add your message here"
    ```
4. Push to your branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.