from rest_framework import serializers
from api_main.models import Cart, CartItem, ProductVariant
from api_main.serializers import ProductVariantSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="product_variant.product.id",read_only=True)
    product_variant_id = serializers.IntegerField(source="product_variant.id", read_only=True)
    product_name = serializers.CharField(source="product_variant.product.name", read_only=True)
    product_description = serializers.CharField(source="product_variant.product.description", read_only=True)
    product_main_image = serializers.CharField(source="product_variant.product.main_image_url", read_only=True)

    size = serializers.CharField(source="product_variant.size.name", read_only=True)
    color = serializers.CharField(source="product_variant.color", read_only=True)
    stock = serializers.IntegerField(source="product_variant.stock", read_only=True)
    price = serializers.DecimalField(
        source="product_variant.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    quantity = serializers.IntegerField(read_only=True)
    item_total_price = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            "product_id",
            "product_variant_id",
            "product_description",
            "product_name",
            "product_main_image",
            "size",
            "color",
            "stock",
            "price",
            "quantity",
            "item_total_price",
            "categories"
        ]

    def get_item_total_price(self, obj):
        if obj.product_variant.price:
            return round(obj.product_variant.price * obj.quantity, 2)
        return 0.00

    def get_categories(self, obj):
        categories = obj.product_variant.product.categories.all()
        return [category.name for category in categories]


class CartSerializer(serializers.ModelSerializer):
    """
    Serializer for the Cart model.
    Includes nested CartItem data and a read-only field for the total price calculation.
    """

    # cart_id = serializers.IntegerField(
    #     source="id", read_only=True
    # )  # Rename 'id' to 'cart_id'
    cart_items = CartItemSerializer(source="items", many=True, read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields =["cart_items", "total_price"]
