import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  orders: Order[];
  wishlist: WishlistItem[];
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-container">
      <!-- User Info Section -->
      <div class="user-info-section">
        <div class="user-header">
          <div class="avatar-container">
            <img [src]="userProfile.avatar" alt="User avatar" class="avatar">
          </div>
          <div class="user-details">
            <h1>{{ userProfile.name }}</h1>
            <p>{{ userProfile.email }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Section -->
      <div class="profile-navigation">
        <button 
          *ngFor="let tab of tabs" 
          [class.active]="activeTab === tab.id"
          (click)="activeTab = tab.id"
          class="tab-button">
          {{ tab.name }}
        </button>
      </div>

      <!-- Content Section -->
      <div class="profile-content" [ngSwitch]="activeTab">
        <!-- Orders Tab -->
        <div *ngSwitchCase="'orders'" class="orders-section">
          <h2>My Orders</h2>
          <div class="orders-list">
            <div *ngFor="let order of userProfile.orders" class="order-card">
              <div class="order-header">
                <div>
                  <h3>Order #{{ order.id }}</h3>
                  <p class="order-date">{{ order.date }}</p>
                </div>
                <span class="order-status" [class]="order.status.toLowerCase()">
                  {{ order.status }}
                </span>
              </div>
              <div class="order-items">
                <div *ngFor="let item of order.items" class="order-item">
                  <img [src]="item.image" [alt]="item.name">
                  <div class="item-details">
                    <h4>{{ item.name }}</h4>
                    <p>Quantity: {{ item.quantity }}</p>
                    <p class="price">₹{{ item.price }}</p>
                  </div>
                </div>
              </div>
              <div class="order-footer">
                <p class="order-total">Total: ₹{{ order.total }}</p>
                <button class="btn-secondary">Track Order</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Wishlist Tab -->
        <div *ngSwitchCase="'wishlist'" class="wishlist-section">
          <h2>My Wishlist</h2>
          <div class="wishlist-grid">
            <div *ngFor="let item of userProfile.wishlist" class="wishlist-item">
              <img [src]="item.image" [alt]="item.name">
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="price">₹{{ item.price }}</p>
                <div class="item-actions">
                  <button class="btn-primary">Add to Cart</button>
                  <button class="btn-secondary">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div *ngSwitchCase="'settings'" class="settings-section">
          <h2>Account Settings</h2>
          <div class="settings-content">
            <div class="settings-group">
              <h3>Personal Information</h3>
              <div class="form-group">
                <label>Name</label>
                <input type="text" [value]="userProfile.name" class="form-control">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" [value]="userProfile.email" class="form-control">
              </div>
              <button class="btn-primary">Save Changes</button>
            </div>
            <div class="settings-group">
              <h3>Security</h3>
              <button class="btn-secondary">Change Password</button>
            </div>
            <div class="settings-group">
              <h3>Account Actions</h3>
              <button class="btn-danger" (click)="authService.logout()">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .user-info-section {
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .user-header {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .avatar-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid #8B6B0B;
    }

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-details h1 {
      margin: 0;
      color: #333;
      font-size: 24px;
    }

    .user-details p {
      margin: 8px 0 0;
      color: #666;
    }

    .profile-navigation {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .tab-button {
      padding: 12px 24px;
      border: none;
      background: none;
      font-size: 16px;
      color: #666;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.3s;
    }

    .tab-button.active {
      color: #8B6B0B;
      border-bottom-color: #8B6B0B;
    }

    .profile-content {
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
      margin: 0 0 2rem;
      color: #333;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .order-card {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1.5rem;
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .order-status {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .order-status.delivered {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .order-status.processing {
      background-color: #fff3e0;
      color: #ef6c00;
    }

    .order-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1rem 0;
    }

    .order-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
    }

    .order-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }

    .wishlist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .wishlist-item {
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
    }

    .wishlist-item img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .item-details {
      padding: 1rem;
    }

    .item-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .settings-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .settings-group {
      padding-bottom: 2rem;
      border-bottom: 1px solid #eee;
    }

    .settings-group:last-child {
      border-bottom: none;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-primary {
      background-color: #8B6B0B;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }

    .btn-primary:hover {
      background-color: #6d5409;
    }

    .btn-secondary {
      background-color: #f5f5f5;
      color: #333;
      padding: 12px 24px;
      border: 1px solid #ddd;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
    }

    .btn-secondary:hover {
      background-color: #e0e0e0;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    .price {
      color: #8B6B0B;
      font-weight: 500;
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .profile-container {
        padding: 1rem;
      }

      .user-header {
        flex-direction: column;
        text-align: center;
      }

      .profile-navigation {
        overflow-x: auto;
        padding-bottom: 0.5rem;
      }

      .wishlist-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
  `]
})
export class ProfileComponent {
  activeTab: string = 'orders';
  
  tabs = [
    { id: 'orders', name: 'Orders' },
    { id: 'wishlist', name: 'Wishlist' },
    { id: 'settings', name: 'Settings' }
  ];

  userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'assets/images/avatar-placeholder.jpg',
    orders: [
      {
        id: 'ORD001',
        date: '2024-02-20',
        status: 'Delivered',
        total: 1399,
        items: [
          {
            name: 'Vintage Coat',
            quantity: 1,
            price: 699,
            image: 'assets/images/products/vintage-coat.jpg'
          },
          {
            name: 'Trousers',
            quantity: 1,
            price: 699,
            image: 'assets/images/products/trousers.jpg'
          }
        ]
      },
      {
        id: 'ORD002',
        date: '2024-02-25',
        status: 'Processing',
        total: 699,
        items: [
          {
            name: 'Roxie Red Overshirt',
            quantity: 1,
            price: 699,
            image: 'assets/images/products/red-overshirt.jpg'
          }
        ]
      }
    ],
    wishlist: [
      {
        id: 'WSH001',
        name: 'Flowered Jacket',
        price: 699,
        image: 'assets/images/products/flowered-jacket.jpg'
      },
      {
        id: 'WSH002',
        name: 'Marron Overshirt',
        price: 699,
        image: 'assets/images/products/marron-overshirt.jpg'
      }
    ]
  };

  constructor(public authService: AuthService) {}
} 