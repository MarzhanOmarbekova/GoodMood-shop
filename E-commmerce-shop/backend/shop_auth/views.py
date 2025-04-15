from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status

from shop_auth.serializers import CustomerRegistrationSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh',
        'api/token/verify',
    ]
    return Response(routes)

class CustomerRegistrationView(APIView):
    def post(self, request):
        serializer = CustomerRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            tokens = serializer.save()
            return Response({
                "message": "User registered successfully",
                "access": tokens['access'],
                "refresh": tokens['refresh']
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)