from rest_framework import serializers
from .models import Product, Category, WishList, Size, ProductVariant, Customer


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category model.
    """

    category_id = serializers.IntegerField(
        source="id", read_only=True
    )  # Renamed 'id' to 'category_id'

    class Meta:
        model = Category
        fields = ["category_id", "name", "description"]


class SizeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Size model.
    """

    # size_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'size_id'

    class Meta:
        model = Size  #'size_id', 'description'
        fields = ["name"]


class ProductVariantSerializer(serializers.ModelSerializer):
    """
    Serializer for the ProductVariant model.
    Includes size and color information.
    """

    product_variant_id = serializers.IntegerField(
        source="id", read_only=True
    )  # Renamed 'id' to 'product_variant_id'
    size = serializers.StringRelatedField()

    class Meta:
        model = ProductVariant
        fields = ["product_variant_id", "size", "color", "stock", "price"]


class ProductDetailSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="id", read_only=True)
    categories = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="name",
    )
    variants = ProductVariantSerializer(many=True, read_only=True)
    in_wishlist = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "product_id",
            "name",
            "description",
            "price",
            "main_image_url",
            'in_wishlist',
            "categories",
            "image_urls",
            "variants",
        ]

    def get_in_wishlist(self, obj):
        """
        Check if the product is in the wishlist of the authenticated user.
        """
        user = self.context.get("request").user
        if user.is_authenticated:
            return WishList.objects.filter(user=user, products=obj).exists()
        return False


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.
    Includes nested category and variants.
    """
    in_wishlist = serializers.SerializerMethodField()
    product_id = serializers.IntegerField(
        source="id", read_only=True
    )  # Renamed 'id' to 'product_id'
    categories = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="name",
    )

    class Meta:
        model = Product
        fields = [
            "product_id",
            "name",
            "price",
            "main_image_url",
            'in_wishlist',
            "description",
            "categories",
        ]  #'image_urls'

    def get_in_wishlist(self, obj):
        """
        Check if the product is in the wishlist of the authenticated user.
        """
        user = self.context.get("request").user
        if user.is_authenticated:
            return WishList.objects.filter(user=user, products=obj).exists()
        return False


class WishListSerializer(serializers.ModelSerializer):
    """
    Serializer for the WishList model.
    Includes nested product variants.
    """

    # wishlist_id = serializers.IntegerField(source='id', read_only=True)  # Renamed 'id' to 'wishlist_id'
    products = ProductSerializer(many=True)

    class Meta:
        model = WishList
        # fields = ['wishlist_id', 'name', 'product_variants', 'created_at', 'updated_at']
        fields = ["products"]


class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Customer model.
    Includes user information.
    """

    customer_id = serializers.IntegerField(
        source="id", read_only=True
    )  # Renamed 'id' to 'customer_id'
    user = serializers.StringRelatedField()

    class Meta:
        model = Customer
        fields = ["customer_id", "user", "address", "phone_number"]
