from rest_framework import serializers
from api_main.models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    """
    Serializer for the CartItem model.
    Includes a read-only field for the total price calculation.
    """

    cart_item_id = serializers.IntegerField(
        source="id", read_only=True
    )  # Rename 'id' to 'cart_item_id'
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ["cart_item_id", "cart", "product_variant", "quantity", "total_price"]


class CartSerializer(serializers.ModelSerializer):
    """
    Serializer for the Cart model.
    Includes nested CartItem data and a read-only field for the total price calculation.
    """

    cart_id = serializers.IntegerField(
        source="id", read_only=True
    )  # Rename 'id' to 'cart_id'
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ["cart_id", "user", "created_at", "updated_at", "items", "total_price"]
