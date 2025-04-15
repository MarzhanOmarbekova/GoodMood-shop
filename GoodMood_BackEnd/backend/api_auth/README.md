# Authentication Module Guide

This module provides authentication functionality, including token-based access and user registration.

## Endpoints

### 1. Obtain Token
- **URL**: `/api/token/`
- **Method**: `POST`
- **Description**: Generates an access and refresh token for valid user credentials.
- **Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response**:
  ```json
  {
    "access": "access_token",
    "refresh": "refresh_token"
  }
  ```

### 2. Refresh Token (with Rotation)
- **URL**: `/api/token/refresh/`
- **Method**: `POST`
- **Description**: Refreshes an access token and generates a new refresh token. The old refresh token becomes invalid.
- **Body**:
  ```json
  {
    "refresh": "refresh_token"
  }
  ```
- **Response**:
  ```json
  {
    "access": "new_access_token",
    "refresh": "new_refresh_token"
  }
  ```

  **Note**: Always update your stored refresh token with the new one returned in the response.

### 3. Verify Token
- **URL**: `/api/token/verify/`
- **Method**: `POST`
- **Description**: Verifies the validity of an access token.
- **Body**:
  ```json
  {
    "token": "access_token"
  }
  ```
- **Response**:
  - **Valid Token**: Returns an empty response with status `200 OK`.
  - **Invalid Token**: Returns an error message with status `401 Unauthorized`.

### 4. User Registration
- **URL**: `/api/registration/`
- **Method**: `POST`
- **Description**: Registers a new user and returns a success message along with access and refresh tokens.
- **Body**:
  ```json
  {
    "email": "john2@example.com",
    "username": "john2_doe",
    "first_name": "John",
    "last_name": "Doe",
    "password": "your_secure_password",
    "address": "123 Main St, City, Country",
    "phone_number": "+1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully.",
    "access": "access_token",
    "refresh": "refresh_token"
  }
  ```

---

## Usage

1. **Register a New User**: Use `/api/registration/` to create a user and retrieve tokens.
2. **Obtain Tokens**: Use `/api/token/` to get access and refresh tokens for an existing user.
3. **Access Protected Routes**: Include the access token in the `Authorization` header:
   ```
   Authorization: Bearer access_token
   ```
4. **Refresh Tokens**: Use `/api/token/refresh/` to renew access and refresh tokens when the access token expires.
5. **Verify Tokens**: Use `/api/token/verify/` to check if a token is valid.

---

## Notes
- **Token Expiry**: Always store the latest refresh token securely, as old tokens become invalid upon refreshing.
- **User Data**: During registration, ensure all required fields (e.g., `email`, `password`, `address`, etc.) are provided.