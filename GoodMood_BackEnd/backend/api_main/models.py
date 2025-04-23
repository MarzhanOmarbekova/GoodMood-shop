from django.db import models
from django.contrib.auth.models import User


class Customer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="customer_profile"
    )
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)


class Category(models.Model):
    """
    Represents a category for products, such as 'Men', 'Women', 'Kids', etc.
    """

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class Product(models.Model):
    """
    Represents a product in the e-commerce system.
    """

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    categories = models.ManyToManyField(Category, related_name="products")
    main_image_url = models.URLField(
        max_length=500, blank=True, null=True, help_text="Main image URL of the product"
    )
    image_urls = models.JSONField(
        blank=True, null=True, help_text="List of additional image URLs for the product"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-created_at"]


class Size(models.Model):
    """
    Represents a size for products, such as S, M, L, XL.
    """

    name = models.CharField(max_length=10, unique=True)  # Example: S, M, L, XL
    description = models.TextField(
        blank=True, null=True
    )  # Optional description for the size
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    """
    Represents a specific variant of a product, such as a size or color variation.
    """

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="variants"
    )
    size = models.ForeignKey(
        Size, on_delete=models.CASCADE, related_name="variants"
    )  # Link to the Size model
    color = models.CharField(
        max_length=50, blank=True, null=True
    )  # Optional attribute for color
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Price for this variant",
    )

    def __str__(self):
        return f"{self.product.name} - {self.size.name} - {self.color} - ${self.price}"

    class Meta:
        unique_together = ("product", "size", "color")


class WishList(models.Model):
    """
    Represents a wishlist for a user, containing product variants.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wishlists")
    products = models.ManyToManyField(
        Product, related_name="wishlists", blank=True
    )
    # name = models.CharField(max_length=255, default="My Wishlist")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"({self.user.username})"



class Cart(models.Model):
    """
    Represents a shopping cart for a user.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="carts")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def total_price(self):
        """
        Calculates the total price of all items in the cart.
        """
        return sum(item.total_price() for item in self.items.all())

    def __str__(self):
        return f"Cart for {self.user.username}"


class CartItem(models.Model):
    """
    Represents an item in the shopping cart.
    """

    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def total_price(self):
        """
        Calculates the total price for this item.
        """
        return self.product_variant.price * self.quantity

    def __str__(self):
        return f"{self.product_variant} x {self.quantity} in {self.cart}"


class Payment(models.Model):
    """
    Represents a payment for an order.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=50,
        choices=[("Pending", "Pending"), ("Completed", "Completed")],
        default="Pending",
    )
    payment_date = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    """
    Represents an order created after payment.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    payment = models.OneToOneField(
        "Payment", on_delete=models.SET_NULL, null=True, related_name="order"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50, default="Pending"
    )  # e.g., Pending, Completed
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

    def calculate_total_price(self):
        return sum(
            item.product_variant.price * item.quantity for item in self.items.all()
        )


class OrderItem(models.Model):
    """
    Represents an item in the order.
    """

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def sub_total(self):
        return self.product_variant.price * self.quantity


class Shipment(models.Model):
    """
    Represents the shipment details of an order.
    """

    order = models.OneToOneField(
        "Order", on_delete=models.CASCADE, related_name="shipment"
    )
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    shipping_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ("Pending", "Pending"),
            ("Shipped", "Shipped"),
            ("Delivered", "Delivered"),
            ("Cancelled", "Cancelled"),
        ],
        default="Pending",
    )

    def __str__(self):
        return f"Shipment for Order {self.order.id}"
