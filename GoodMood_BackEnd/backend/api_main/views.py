from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .models import Product, ProductVariant, WishList
from .serializers import ProductSerializer, WishListSerializer


class ProductListView(ListAPIView):
    """
    Retrieves a list of all products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class ProductDetailView(RetrieveAPIView):
    """
    Retrieves details of a single product, including its variants (sizes and costs).
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        """
        Custom retrieve method to include all variants for the product.
        """
        product = self.get_object()  # Get the specific product instance
        product_data = ProductSerializer(product).data  # Serialize the product

        # Get all variants associated with the product
        variants = ProductVariant.objects.filter(product=product)
        variant_data = [
            {
                "id": variant.id,
                "size": variant.size.name,
                "color": variant.color,
                "price": variant.price,
                "stock": variant.stock,
            }
            for variant in variants
        ]

        # Append the product variants to the response
        product_data["variants"] = variant_data

        return Response(product_data)


class WishListView(APIView):
    """
    Handles Wishlist operations such as retrieving, adding, and removing product variants.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieves the wishlist of the authenticated user.
        """
        wishlist = WishList.objects.filter(user=request.user)
        serializer = WishListSerializer(wishlist, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Adds a product variant to the authenticated user's wishlist.
        """
        user = request.user
        wishlist, _ = WishList.objects.get_or_create(user=user, name="My Wishlist")  # Default wishlist
        product_variant_id = request.data.get('product_variant_id')

        # Ensure the product variant exists
        try:
            product_variant = ProductVariant.objects.get(id=product_variant_id)
        except ProductVariant.DoesNotExist:
            return Response({'error': 'Product variant not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Add the product variant to the wishlist
        wishlist.product_variants.add(product_variant)
        return Response({'message': 'Product variant added to wishlist.'}, status=status.HTTP_201_CREATED)

    def delete(self, request):
        """
        Removes a product variant from the authenticated user's wishlist.
        """
        user = request.user
        product_variant_id = request.data.get('product_variant_id')

        # Ensure the product variant exists and is in the user's wishlist
        try:
            wishlist = WishList.objects.get(user=user, name="My Wishlist")  # Default wishlist
            product_variant = ProductVariant.objects.get(id=product_variant_id)
            wishlist.product_variants.remove(product_variant)
            return Response({'message': 'Product variant removed from wishlist.'}, status=status.HTTP_204_NO_CONTENT)
        except (WishList.DoesNotExist, ProductVariant.DoesNotExist):
            return Response({'error': 'Product variant not found in wishlist.'}, status=status.HTTP_404_NOT_FOUND)