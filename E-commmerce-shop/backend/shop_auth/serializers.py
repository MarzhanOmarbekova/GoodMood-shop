from django.contrib.auth.models import User
from rest_framework import serializers
from core.models import Customer
from rest_framework_simplejwt.tokens import RefreshToken


class CustomerRegistrationSerializer(serializers.Serializer):
    # User model fields
    email = serializers.EmailField(write_only=True)
    username = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    # Customer model fields
    address = serializers.CharField(required=True, write_only=True)
    phone_number = serializers.CharField(required=True, write_only=True)

    class Meta:
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'address', 'phone_number']

    def validate(self, data):
        """
        Check if a user with the given email or username already exists.
        """
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({'email': 'A user with this email already exists.'})
        if User.objects.filter(username=data.get('username')).exists():
            raise serializers.ValidationError({'username': 'A user with this username already exists.'})
        return data

    def create(self, validated_data):
        # Extract User-related fields
        email = validated_data.pop('email')
        username = validated_data.pop('username')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        password = validated_data.pop('password')

        # Extract Customer-related fields
        address = validated_data.pop('address')
        phone_number = validated_data.pop('phone_number')

        # Create the User instance
        user = User.objects.create(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()

        # Create the Customer instance
        customer = Customer.objects.create(
            user=user,
            address=address,
            phone_number=phone_number
        )

        # Generate JWT tokens for the user
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }