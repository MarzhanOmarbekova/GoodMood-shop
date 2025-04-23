# GoodMood-shop

E-Commerce Shop

Group members:

Marzhan Omarbekova

Mirkhat Kuljatayev

Alixan Adilbaev 

# GoodMood Shop - Full Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Components](#components)
4. [Services](#services)
5. [Models](#models)
6. [Routing](#routing)
7. [Authentication](#authentication)
8. [Styling Guidelines](#styling-guidelines)
9. [Best Practices](#best-practices)

## Overview

GoodMood Shop is a modern e-commerce application built with Angular. It provides a complete shopping experience with features like user authentication, product browsing, cart management, wishlists, and more.

## Architecture

The application follows a modular architecture with standalone components, utilizing Angular's latest features:

```
front/src/app/
├── auth/                 # Authentication related components
├── components/          # Shared components
├── models/             # Data models/interfaces
├── services/           # Application services
├── layout/            # Layout components
└── pages/             # Main page components
```

## Components

### 1. HomeComponent
Main landing page component displaying featured products and collections.

#### Features
- Banner section with call-to-action
- Featured products display
- Collections showcase
- Made-to-order section
- Features section

#### Key Methods
```typescript
loadFeaturedProducts(): void
navigateToProduct(productId: string): void
toggleWishlist(product: Product): void
```

### 2. CartComponent
Shopping cart management component.

#### Properties
```typescript
cartItems: CartItem[] = [];
totalPrice: number = 0;
loading: boolean = true;
updatingItems: Set<number> = new Set();
```

#### Methods
```typescript
fetchCart(): void
updateQuantity(item: CartItem, newQuantity: number): void
removeItem(productVariantId: number): void
checkout(): void
```

### 3. WishlistComponent
Wishlist management component with product details modal.

#### Properties
```typescript
@Input() wishlist?: WishlistItem[];
products: WishlistItem[] = [];
selectedProductDetail: ProductDetail | null = null;
```

#### Methods
```typescript
loadWishlist(): void
removeFromWishlist(productId: string): void
openModal(productId: string): void
addToCart(): void
```

### 4. NavbarComponent
Main navigation component with authentication state management.

#### Features
- Responsive navigation
- Authentication state display
- Cart and profile links
- Mega sale banner

### 5. ProfileComponent
User profile management component with multiple tabs.

#### Properties
```typescript
activeTab: string = 'orders';
userProfile: UserProfile;
```

#### Methods
```typescript
loadUserProfile(): void
setActiveTab(tabId: string): void
```

## Services

### 1. AuthService
Handles authentication and token management.

#### Methods
```typescript
login(data: LoginData): Observable<any>
register(data: RegisterData): Observable<any>
logout(): void
isAuthenticated(): boolean
refreshToken(): Observable<any>
```

### 2. CartService
Manages shopping cart operations.

#### Methods
```typescript
getCart(): Observable<CartResponse>
addItem(productVariantId: number, quantity: number): Observable<any>
updateItem(productVariantId: number, quantity: number): Observable<any>
removeItem(productVariantId: number): Observable<any>
```

### 3. WishlistService
Handles wishlist operations.

#### Methods
```typescript
getWishList(): Observable<WishlistItem[]>
addToWishList(productId: string): Observable<any>
removeFromWishList(productId: string): Observable<any>
```

## Models

### 1. CartItem
```typescript
interface CartItem {
  product_id: number;
  product_variant_id: number;
  product_name: string;
  product_description: string;
  product_main_image: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  quantity: number;
  item_total_price: number;
}
```

### 2. UserProfile
```typescript
interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  orders: Order[];
  wishlist: WishlistItem[];
}
```

## Routing

The application uses Angular's router with lazy loading:

```typescript
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'auth', children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent }
      ]},
      { path: 'profile', component: ProfileComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent }
    ]
  }
];
```

## Authentication

Authentication is implemented using JWT tokens:

- Access token for API requests
- Refresh token for token renewal
- Route guards for protected routes
- Automatic token refresh mechanism

## Styling Guidelines

### 1. Color Palette
```scss
$primary: #8B6B0B;
$secondary: #27235C;
$background: #FAEDDF;
$text: #333333;
$error: #ff4444;
```

### 2. Responsive Breakpoints
```scss
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
```

### 3. Common Components
- Buttons
- Forms
- Cards
- Modals
- Loading states

## Best Practices

### 1. Component Development
- Use standalone components
- Implement proper lifecycle hooks
- Handle component destruction
- Manage subscriptions properly

### 2. Error Handling
- Implement error boundaries
- Provide user feedback
- Log errors appropriately
- Handle network errors gracefully

### 3. Performance
- Implement lazy loading
- Use trackBy for lists
- Optimize change detection
- Cache API responses

### 4. Security
- Implement CSRF protection
- Sanitize user inputs
- Secure token storage
- Handle sensitive data properly

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build --prod
```

## Testing

```bash
# Run unit tests
ng test

# Run end-to-end tests
ng e2e
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2024 GoodMood Shop. All rights reserved.

