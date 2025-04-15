from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer_profile')
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
        ordering = ['name']




class Product(models.Model):
    """
    Represents a product in the e-commerce system.
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    main_image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Main image URL of the product")
    image_urls = models.JSONField(blank=True, null=True, help_text="List of additional image URLs for the product")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']




class Size(models.Model):
    """
    Represents a size for products, such as S, M, L, XL.
    """
    name = models.CharField(max_length=10, unique=True)  # Example: S, M, L, XL
    description = models.TextField(blank=True, null=True)  # Optional description for the size
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



class ProductVariant(models.Model):
    """
    Represents a specific variant of a product, such as a size or color variation.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.ForeignKey(Size, on_delete=models.CASCADE, related_name='variants')  # Link to the Size model
    color = models.CharField(max_length=50, blank=True, null=True)  # Optional attribute for color
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Price for this variant")

    def __str__(self):
        return f"{self.product.name} - {self.size.name} - {self.color} - ${self.price}"

    class Meta:
        unique_together = ('product', 'size', 'color')



class WishList(models.Model):
    """
    Represents a wishlist for a user, containing product variants.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlists')
    product_variants = models.ManyToManyField(ProductVariant, related_name='wishlists', blank=True)
    name = models.CharField(max_length=255, default="My Wishlist")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

    class Meta:
        unique_together = ('user', 'name')  # Ensure unique wishlist names per user
        ordering = ['-created_at']




class Payment(models.Model):
    #payment_id
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=255)
    amount = models.FloatField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='payments')

class Shipment (models.Model): #done
    #shipment_id
    shipment_date = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=255)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='shipments')

class Order(models.Model): #done
    #order_id
    order_date = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True, related_name='orders')
    shipment = models.ForeignKey(Shipment, on_delete=models.SET_NULL, null=True, related_name='orders')

class OrderItem(models.Model): #done
    #order_item_id
    quantity = models.IntegerField()
    price = models.FloatField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')

class Cart(models.Model): #done
    #cart_id
    quantity = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='carts')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='carts')


