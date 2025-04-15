from rest_framework import serializers
from .models import Product, Category, WishList, Size, ProductVariant, Customer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name','description']

class SizeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Size model.
    """

    class Meta:
        model = Size
        fields = ['id', 'name', 'description']

class ProductVariantSerializer(serializers.ModelSerializer):
    """
    Serializer for the ProductVariant model.
    Includes size and color information.
    """
    size = SizeSerializer()

    class Meta:
        model = ProductVariant
        fields = ['id', 'size', 'color', 'price', 'stock']


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.
    Includes nested category and variants.
    """
    category = CategorySerializer()
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'category', 'main_image_url', 'image_urls',
            'created_at', 'updated_at', 'variants'
        ]

class WishListSerializer(serializers.ModelSerializer):
    """
    Serializer for the WishList model.
    Includes nested product variants.
    """
    product_variants = ProductVariantSerializer(many=True)

    class Meta:
        model = WishList
        fields = ['id', 'name', 'product_variants', 'created_at', 'updated_at']


class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Customer model.
    Includes user information.
    """
    user = serializers.StringRelatedField()

    class Meta:
        model = Customer
        fields = ['id', 'user', 'address', 'phone_number']