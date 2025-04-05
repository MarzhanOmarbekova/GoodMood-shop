# Auth module
<hr>

This module provide the JWT token logic
## How to use it:
- POST request to **.../api/signup/** with JSON User model(From DRF) for creating user 
- POST request to **.../api/login/**  with email and username JSON for login,returns token
- GET request to **.../api/test_token/** for checking token