from rest_framework import serializers
from .models import Product, Category, WishList, Size, ProductVariant, Customer

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category model.
    """
    category_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'category_id'

    class Meta:
        model = Category
        fields = ['category_id', 'name', 'description']


class SizeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Size model.
    """
    size_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'size_id'

    class Meta:
        model = Size
        fields = ['size_id', 'name', 'description']


class ProductVariantSerializer(serializers.ModelSerializer):
    """
    Serializer for the ProductVariant model.
    Includes size and color information.
    """
    product_variant_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'product_variant_id'
    size = SizeSerializer()

    class Meta:
        model = ProductVariant
        fields = ['product_variant_id', 'size', 'color', 'price', 'stock']


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.
    Includes nested category and variants.
    """
    product_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'product_id'
    categories = CategorySerializer()
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'product_id', 'name', 'description', 'price', 'categories', 'main_image_url', 'image_urls',
            'created_at', 'updated_at', 'variants'
        ]


class WishListSerializer(serializers.ModelSerializer):
    """
    Serializer for the WishList model.
    Includes nested product variants.
    """
    wishlist_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'wishlist_id'
    product_variants = ProductVariantSerializer(many=True)

    class Meta:
        model = WishList
        fields = ['wishlist_id', 'name', 'product_variants', 'created_at', 'updated_at']


class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Customer model.
    Includes user information.
    """
    customer_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'customer_id'
    user = serializers.StringRelatedField()

    class Meta:
        model = Customer
        fields = ['customer_id', 'user', 'address', 'phone_number']