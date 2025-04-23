from django.contrib import admin

# Register your models here.
from .models import (
    Customer,
    Category,
    Product,
    Size,
    ProductVariant,
    WishList,
    Payment,
    Shipment,
    Order,
    OrderItem,
    Cart,
)


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("user", "address", "phone_number")


# Category Admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_at")
    search_fields = ("name",)


# Product Admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "created_at")  # Fields to display in the list view
    search_fields = ("name", "description")  # Fields to search by
    list_filter = ("categories", "created_at")  # Filters in the sidebar
    filter_horizontal = (
        "categories",
    )  # Horizontal widget for managing many-to-many categories


# ProductVariant Admin
@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ("product", "size", "color", "price", "stock")
    search_fields = ("product__name", "color")
    list_filter = ("size", "color")


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created_at",
    )  # Display fields in the list view
    search_fields = ("name", "description")  # Add search functionality
    list_filter = ("created_at",)  #     Add a filter by creation date


# WishList Admin
@admin.register(WishList)
class WishListAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at")


# Payment Admin
