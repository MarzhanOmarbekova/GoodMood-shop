from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import CustomerRegistrationView, UserProfileView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path('registration/', CustomerRegistrationView.as_view(), name='register'),
    path('userinfo/', UserProfileView.as_view(), name='userinfo'),
]
