# views.py

from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Product, Cart, WishList, Customer
from .serializers import ProductSerializer, WishListSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class WishListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer = request.user.customer_profile
        wishlist = WishList.objects.filter(customer=customer)
        serializer = WishListSerializer(wishlist, many=True)
        return Response(serializer.data)

    def post(self, request):
        customer = request.user.customer_profile
        product_id = request.data.get('product_id')
        product = Product.objects.get(id=product_id)
        WishList.objects.create(customer=customer, product=product)
        return Response({'message': 'Added to wishlist'}, status=status.HTTP_201_CREATED)

    def delete(self, request):
        customer = request.user.customer_profile
        product_id = request.data.get('product_id')
        WishList.objects.filter(customer=customer, product__id=product_id).delete()
        return Response({'message': 'Removed from wishlist'}, status=status.HTTP_204_NO_CONTENT)

