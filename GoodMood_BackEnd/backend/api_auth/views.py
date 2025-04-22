from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
import logging

from .serializers import CustomerRegistrationSerializer

# Настройка логирования
logger = logging.getLogger(__name__)


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
    permission_classes = [AllowAny]

    def post(self, request):
        logger.info(f"Получен запрос на регистрацию: {request.data}")
        serializer = CustomerRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            try:
                tokens = serializer.save()
                logger.info(f"Пользователь успешно зарегистрирован: {request.data.get('username')}")
                return Response(
                    {
                        "message": "User registered successfully",
                        "access": tokens["access"],
                        "refresh": tokens["refresh"],
                    },
                    status=status.HTTP_201_CREATED,
                )
            except Exception as e:
                logger.error(f"Ошибка при регистрации пользователя: {str(e)}")
                return Response(
                    {"error": "Registration failed", "details": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        
        logger.warning(f"Ошибка валидации при регистрации: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
