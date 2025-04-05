from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model): #done
    #customer_id
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer_profile')
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)

class Category(models.Model): #done
    #category_id
    name = models.CharField(max_length=100)


class Product(models.Model): #do #done
    #product_id
    SKU = models.CharField(max_length=255) #stock keeping unit
    description = models.TextField()
    price = models.FloatField()
    stock = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

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

class WishList(models.Model): #done
    #wishlist_id
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='wishlists')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlists')

