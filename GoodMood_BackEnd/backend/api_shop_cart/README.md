# Cart API

This project provides an API for managing a shopping cart. Users can add, update, and remove items from their cart, as well as retrieve the details of their cart. The API is built using Django and Django REST Framework.

---

## Features

- **Retrieve Cart**: Get the details of the authenticated user's cart, including items and total price.
- **Add Items to Cart**: Add a product variant to the cart with a specified quantity.
- **Update Cart Items**: Update the quantity of an existing item in the cart.
- **Remove Items from Cart**: Remove an item from the cart.

---

## Endpoints

### **Cart Endpoints**

#### 1. Retrieve Cart
- **URL**: `/api/cart/`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's cart, including cart items and total price.
- **Permission**: Requires authentication.
- **Response Example**:
    ```json
    {
        "cart_id": 1,
        "user": 1,
        "created_at": "2025-04-01T12:00:00Z",
        "updated_at": "2025-04-10T15:00:00Z",
        "items": [
            {
                "cart_item_id": 1,
                "cart": 1,
                "product_variant": 2,
                "quantity": 3,
                "total_price": 59.97
            },
            {
                "cart_item_id": 2,
                "cart": 1,
                "product_variant": 5,
                "quantity": 2,
                "total_price": 39.98
            }
        ],
        "total_price": 99.95
    }
    ```

#### 2. Add Item to Cart
- **URL**: `/api/cart/`
- **Method**: `POST`
- **Description**: Adds a product variant to the cart. If the item already exists, the quantity is increased.
- **Permission**: Requires authentication.
- **Request Example**:
    ```json
    {
        "product_variant_id": 2,
        "quantity": 3
    }
    ```
- **Response Example**:
    ```json
    {
        "message": "Item added to cart successfully."
    }
    ```

#### 3. Update Cart Item Quantity
- **URL**: `/api/cart/`
- **Method**: `PUT`
- **Description**: Updates the quantity of an existing cart item.
- **Permission**: Requires authentication.
- **Request Example**:
    ```json
    {
        "cart_item_id": 1,
        "quantity": 5
    }
    ```
- **Response Example**:
    ```json
    {
        "message": "Item quantity updated successfully."
    }
    ```

#### 4. Remove Item from Cart
- **URL**: `/api/cart/`
- **Method**: `DELETE`
- **Description**: Removes an item from the cart.
- **Permission**: Requires authentication.
- **Request Example**:
    ```json
    {
        "cart_item_id": 1
    }
    ```
- **Response Example**:
    ```json
    {
        "message": "Item removed from cart successfully."
    }
    ```

---

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/cart-api.git
    cd cart-api
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

- All cart endpoints require authentication.
- Use token-based authentication (e.g., via `Authorization: Token <your-token>` in request headers).

---

## Models Overview

### Cart
- Represents a shopping cart for a user.
- Fields: `user`, `created_at`, `updated_at`.
- Methods: `total_price()`.

### CartItem
- Represents an item in the shopping cart.
- Fields: `cart`, `product_variant`, `quantity`.
- Methods: `total_price()`.

### ProductVariant
- Represents a specific variant of a product (e.g., size, color).
- Fields: `product`, `size`, `color`, `price`, `stock`.

---

## Serializers

### CartSerializer
- Serializes the `Cart` model and includes:
  - `cart_id`: Renamed `id` field.
  - `items`: Nested `CartItemSerializer`.
  - `total_price`: Read-only field for the total price of the cart.

### CartItemSerializer
- Serializes the `CartItem` model and includes:
  - `cart_item_id`: Renamed `id` field.
  - `total_price`: Read-only field for the total price of the cart item.

---

## Example API Workflows

### Add Item to Cart
1. Send a `POST` request to `/api/cart/` with the product variant ID and quantity.
2. If the item already exists in the cart, its quantity is increased.
3. The server responds with a success message.

### Update Cart Item Quantity
1. Send a `PUT` request to `/api/cart/` with the cart item ID and the new quantity.
2. The cart item's quantity is updated to the specified value.
3. The server responds with a success message.

### Remove Item from Cart
1. Send a `DELETE` request to `/api/cart/` with the cart item ID.
2. The specified item is removed from the cart.
3. The server responds with a success message.

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