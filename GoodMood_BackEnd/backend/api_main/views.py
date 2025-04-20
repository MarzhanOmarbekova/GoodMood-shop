from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .models import Product, ProductVariant, WishList
from .serializers import ProductSerializer, WishListSerializer, ProductDetailSerializer


class ProductListView(ListAPIView):
    """
    Retrieves a list of all products.
    """

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        """
        Add the request to the serializer context.
        """
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

class ProductDetailView(RetrieveAPIView):
    """
    Retrieves details of a single product, including its variants (sizes and costs).
    """

    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        """
        Переопределяем get_object(), чтобы извлечь продукт по его id (pk).
        """
        return super().get_object()

    def get_serializer_context(self):
        """
        Add the request to the serializer context.
        """
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


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
        serializer = WishListSerializer(wishlist, many=True,context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        """
        Adds a product variant to the authenticated user's wishlist.
        """
        user = request.user
        wishlist, _ = WishList.objects.get_or_create(
            user=user
        )  # Default wishlist
        product_id = request.data.get("product_id")

        # Ensure the product variant exists
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Add the product variant to the wishlist
        wishlist.products.add(product)
        return Response(
            {"message": "Product  added to wishlist."},
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request):
        """
        Removes a product variant from the authenticated user's wishlist.
        """
        user = request.user
        product_id = request.data.get("product_id")

        # Ensure the product variant exists and is in the user's wishlist
        try:
            wishlist = WishList.objects.get(user=user)  # Default wishlist
        except WishList.DoesNotExist:
            return Response(
                {"error": "Wishlist not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if product not in wishlist.products.all():
            return Response(
                {"error": "Product not found in your wishlist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        wishlist.products.remove(product)


        return Response(
            {"message": "Product removed from wishlist."},
            status=status.HTTP_204_NO_CONTENT,
        )