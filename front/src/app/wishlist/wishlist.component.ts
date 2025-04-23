import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../services/wishlist.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { WishlistItem } from '../models/profile.model';
import {Product, ProductDetail} from '../models/product.model';
import {ProductDetailService} from '../services/product-detail.service';
import {CartService} from '../services/cart.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit, OnDestroy, OnChanges {
  @Input() wishlist?: WishlistItem[];
  products: WishlistItem[] = [];
  loading: boolean = true;
  private routerSubscription?: Subscription;

  selectedProductDetail: ProductDetail | null = null;
  selectedVariantId: number | null = null;
  selectedQuantity: number = 1;

  isAddingToCart = false;
  showSizeError = false;
  errorMessage: string | null = null;

  constructor(
    private wishlistService: WishlistService,
    private router: Router,
    private productDetailService: ProductDetailService,
    private cartService: CartService,
  ) {
    // Подписываемся на изменения маршрута только если компонент используется как отдельная страница
    if (!this.isEmbedded()) {
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.loadWishlist();
      });
    }
  }

  private isEmbedded(): boolean {
    return Array.isArray(this.wishlist) && this.wishlist.length > 0;
  }

  ngOnInit(): void {
    this.loadWishlist();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wishlist'] && changes['wishlist'].currentValue) {
      this.products = changes['wishlist'].currentValue;
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadWishlist(): void {
    this.loading = true;
    console.log('Loading wishlist...');
    this.wishlistService.getWishList().subscribe({
      next: (products) => {
        console.log('Received products:', products);
        this.products = Array.isArray(products) ? products : [];
        console.log('Updated products array:', this.products);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading wishlist:', error);
        this.products = [];
        this.loading = false;
      }
    });
  }

  removeFromWishlist(productId: string): void {
    console.log('Removing product:', productId);
    this.wishlistService.removeFromWishList(productId).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== productId);
        console.log('Product removed, remaining products:', this.products);
        this.loadWishlist();
      },
      error: (error) => {
        console.error('Error removing from wishlist:', error);
      }
    });
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  openModal(productId: string): void {
    this.productDetailService.getProductDetail(productId).subscribe({
      next: (detail) => {
        this.selectedProductDetail = detail;
        this.selectedVariantId =detail.variants?.[0]?.product_variant_id || null;
        this.selectedQuantity = 1;
      }
    })
  }

  closeModal(): void {
    this.selectedProductDetail = null;
    this.selectedVariantId = null;
    this.selectedQuantity = 1;
    this.showSizeError = false;
    this.errorMessage = null;
  }

  addToCart(): void {
    if (!this.selectedVariantId) {
      this.showSizeError = true;
      return;
    }

    this.showSizeError = false;
    this.errorMessage = null;
    this.isAddingToCart = true;

    this.cartService.addItem(this.selectedVariantId, this.selectedQuantity).subscribe({
      next: () => {
        this.isAddingToCart = false;
        this.closeModal();
      },
      error: (error) => {
        this.isAddingToCart = false;
        this.errorMessage = error.error?.message || 'Failed to add item to cart. Please try again.';
      }
    });
  }
}
