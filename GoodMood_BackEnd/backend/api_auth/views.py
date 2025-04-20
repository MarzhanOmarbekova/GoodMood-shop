from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status

from .serializers import CustomerRegistrationSerializer


class RoutesView(APIView):
    def get(self, request):
        routes = [
            {"url": "api/token", "description": "Get access and refresh tokens"},
            {
                "url": "api/token/refresh",
                "description": "Refresh the access token using a refresh token",
            },
            {
                "url": "api/token/verify",
                "description": "Verify the validity of an access token",
            },
            {"url": "api/registration", "description": "Register a new user"},
        ]
        return Response(routes)


class CustomerRegistrationView(APIView):
    def post(self, request):
        serializer = CustomerRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            tokens = serializer.save()
            return Response(
                {
                    "message": "User registered successfully",
                    "access": tokens["access"],
                    "refresh": tokens["refresh"],
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
