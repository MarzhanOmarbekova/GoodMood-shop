from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api_main.models import Cart, CartItem, ProductVariant
from .serializers import CartSerializer, CartItemSerializer
from rest_framework import status


class CartView(APIView):
    """
    Handles operations on the user's cart.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieves the authenticated user's cart.
        """
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        """
        Adds a product variant to the cart.
        """
        product_variant_id = request.data.get("product_variant_id")
        quantity = request.data.get("quantity", 1)

        try:
            product_variant = ProductVariant.objects.get(id=product_variant_id)
        except ProductVariant.DoesNotExist:
            return Response(
                {"error": "Product variant not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_variant=product_variant,
            defaults={"quantity": quantity}  # вот оно!
        )

        if not created:
            cart_item.quantity += quantity
        cart_item.save()

        return Response(
            {"message": "Item added to cart successfully."},
            status=status.HTTP_201_CREATED,
        )

    def put(self, request):
        """
        Updates the quantity of a cart item by product_variant_id.
        """
        product_variant_id = request.data.get("product_variant_id")
        new_quantity = request.data.get("quantity")

        if not product_variant_id:
            return Response(
                {"error": "Product variant ID is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if new_quantity is None or not isinstance(new_quantity, int) or new_quantity < 1:
            return Response(
                {"error": "Quantity must be a positive integer."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not ProductVariant.objects.filter(id=product_variant_id).exists():
            return Response(
                {"error": "Product variant not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item = cart.items.filter(product_variant__id=product_variant_id).first()

        if not cart_item:
            return Response(
                {"error": "This item is not in your cart."},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart_item.quantity = new_quantity
        cart_item.save()

        return Response(
            {"message": "Item quantity updated successfully."},
            status=status.HTTP_200_OK,
        )

    def delete(self, request):
        """
        Removes an item from the cart using product_variant_id.
        """
        product_variant_id = request.data.get("product_variant_id")

        if not product_variant_id:
            return Response(
                {"error": "Product variant ID is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not ProductVariant.objects.filter(id=product_variant_id).exists():
            return Response(
                {"error": "Product variant not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Используем get_or_create, чтобы избежать try/except
        cart, _ = Cart.objects.get_or_create(user=request.user)

        cart_item = cart.items.filter(product_variant__id=product_variant_id).first()

        if not cart_item:
            return Response(
                {"error": "This item is not in your cart."},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart_item.delete()
        return Response(
            {"message": "Item removed from cart successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
