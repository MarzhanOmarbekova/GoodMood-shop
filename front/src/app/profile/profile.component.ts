import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../services/profile.service';
import { UserProfile, WishlistItem } from '../models/profile.model';
import { Product } from '../models/product.model';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, OrdersComponent, WishlistComponent, SettingsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'orders';
  tabs = [
    { id: 'orders', name: 'Orders' },
    { id: 'wishlist', name: 'Wishlist' },
    { id: 'settings', name: 'Settings' }
  ];

  userProfile: UserProfile = {
    name: '',
    email: '',
    avatar: '',
    orders: [],
    wishlist: []
  };

  get wishlistProducts(): WishlistItem[] {
    return this.userProfile.wishlist;
  }

  constructor(
    public authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    this.profileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = {
          ...profile,
          wishlist: profile.wishlist || []
        };
        console.log('Profile loaded:', this.userProfile);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      }
    });
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    if (tabId === 'wishlist') {
      // this.loadUserProfile();
    }
  }
} 