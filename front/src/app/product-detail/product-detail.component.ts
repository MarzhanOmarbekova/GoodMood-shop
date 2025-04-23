import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../services/product-detail.service';
import { CartService } from '../services/cart.service';
import { ProductDetail } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="product-detail-container" *ngIf="product">
      <!-- Image Gallery Section -->
      <div class="product-gallery">
        <div class="main-image">
          <img [src]="selectedImage || product.main_image_url" [alt]="product.name"
               [@imageChange]="imageState"
               (@imageChange.done)="onImageAnimationComplete()">
        </div>
        <div class="thumbnail-list">
          <div class="thumbnail" 
               *ngFor="let image of product.images" 
               [class.active]="selectedImage === image"
               (click)="changeImage(image)">
            <img [src]="image" [alt]="product.name">
          </div>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="product-info" [@slideIn]>
        <h1>{{product.name}}</h1>
        <div class="price">{{product.price}} ₽</div>
        
        <div class="rating" *ngIf="product.rating">
          <div class="stars">
            <span class="star" *ngFor="let star of [1,2,3,4,5]">
              ★
            </span>
          </div>
          <span class="rating-count">({{product.review_count}} reviews)</span>
        </div>

        <div class="description">
          <p>{{product.description}}</p>
        </div>

        <!-- Variant Selection -->
        <div class="variants" *ngIf="product.variants?.length">
          <h3>Select Size</h3>
          <div class="size-grid">
            <button *ngFor="let variant of product.variants"
                    class="size-btn"
                    [class.active]="selectedVariantId === variant.product_variant_id"
                    [class.out-of-stock]="variant.stock === 0"
                    (click)="selectVariant(variant)">
              {{variant.size}}
            </button>
          </div>
          <p class="error-message" *ngIf="showSizeError">Please select a size</p>
        </div>

        <!-- Quantity Selection -->
        <div class="quantity-selector">
          <h3>Quantity</h3>
          <div class="quantity-controls">
            <button (click)="decrementQuantity()" [disabled]="quantity <= 1">-</button>
            <input type="number" [(ngModel)]="quantity" min="1" [max]="maxQuantity">
            <button (click)="incrementQuantity()" [disabled]="quantity >= maxQuantity">+</button>
          </div>
          <p class="stock-info" *ngIf="selectedVariant">
            {{selectedVariant.stock}} items available
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="add-to-cart" 
                  (click)="addToCart()"
                  [disabled]="isAddingToCart"
                  [class.loading]="isAddingToCart">
            <span *ngIf="!isAddingToCart">Add to Cart</span>
            <span *ngIf="isAddingToCart">Adding...</span>
          </button>
          <button class="wishlist-btn" 
                  (click)="toggleWishlist()"
                  [class.in-wishlist]="product.in_wishlist">
            <span class="heart-icon">♥</span>
          </button>
        </div>

        <!-- Product Details -->
        <div class="product-details">
          <div class="detail-section">
            <h3>Product Details</h3>
            <ul>
              <li *ngFor="let detail of product.details">{{detail}}</li>
            </ul>
          </div>
          
          <div class="detail-section">
            <h3>Material & Care</h3>
            <ul>
              <li *ngFor="let care of product.care_instructions">{{care}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="loading-state" *ngIf="!product">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }

    /* Gallery Styles */
    .product-gallery {
      position: sticky;
      top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .main-image {
      aspect-ratio: 3/4;
      border-radius: 8px;
      overflow: hidden;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-list {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding: 0.5rem 0;
    }

    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.3s ease;
    }

    .thumbnail:hover,
    .thumbnail.active {
      opacity: 1;
      transform: translateY(-2px);
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Product Info Styles */
    .product-info {
      padding: 1rem 0;
    }

    h1 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 1.5rem;
      color: #8B6B0B;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .stars {
      color: #FFD700;
    }

    .rating-count {
      color: #666;
    }

    .description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    /* Variant Selection */
    .variants {
      margin-bottom: 2rem;
    }

    .size-grid {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .size-btn {
      width: 50px;
      height: 50px;
      border: 2px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .size-btn:hover:not(.out-of-stock) {
      border-color: #8B6B0B;
    }

    .size-btn.active {
      border-color: #8B6B0B;
      background: #8B6B0B;
      color: white;
    }

    .size-btn.out-of-stock {
      opacity: 0.5;
      cursor: not-allowed;
      text-decoration: line-through;
    }

    .error-message {
      color: #ff4b4b;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }

    /* Quantity Selector */
    .quantity-selector {
      margin-bottom: 2rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .quantity-controls button {
      width: 40px;
      height: 40px;
      border: none;
      background: #f5f5f5;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .quantity-controls button:hover:not(:disabled) {
      background: #e5e5e5;
    }

    .quantity-controls input {
      width: 60px;
      height: 40px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .stock-info {
      color: #666;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    /* Action Buttons */
    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .add-to-cart {
      flex: 1;
      padding: 1rem;
      background: #8B6B0B;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .add-to-cart:hover:not(:disabled) {
      background: #6d5409;
    }

    .add-to-cart.loading {
      opacity: 0.7;
      cursor: wait;
    }

    .wishlist-btn {
      width: 50px;
      height: 50px;
      border: none;
      background: #f5f5f5;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.5rem;
      color: #ccc;
      transition: all 0.3s ease;
    }

    .wishlist-btn:hover {
      background: #e5e5e5;
    }

    .wishlist-btn.in-wishlist {
      color: #ff4b4b;
    }

    /* Product Details */
    .product-details {
      border-top: 1px solid #eee;
      padding-top: 2rem;
    }

    .detail-section {
      margin-bottom: 2rem;
    }

    .detail-section h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    .detail-section ul {
      list-style: none;
      padding: 0;
      color: #666;
    }

    .detail-section li {
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .detail-section li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #8B6B0B;
    }

    /* Loading State */
    .loading-state {
      text-align: center;
      padding: 4rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #8B6B0B;
      border-radius: 50%;
      margin: 0 auto 1rem;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .product-detail-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .product-gallery {
        position: static;
      }
    }
  `],
  animations: [
    trigger('imageChange', [
      state('initial', style({
        opacity: 1
      })),
      state('changing', style({
        opacity: 0
      })),
      transition('initial => changing', animate('300ms ease-out')),
      transition('changing => initial', animate('300ms ease-in'))
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('500ms ease', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ProductDetailComponent implements OnInit {
  product: ProductDetail | null = null;
  selectedImage: string | null = null;
  selectedVariantId: number | null = null;
  selectedVariant: any = null;
  quantity: number = 1;
  maxQuantity: number = 10;
  showSizeError: boolean = false;
  isAddingToCart: boolean = false;
  imageState: 'initial' | 'changing' = 'initial';

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProductDetails(productId);
      }
    });
  }

  loadProductDetails(productId: string) {
    this.productDetailService.getProductDetail(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.selectedImage = product.main_image_url;
        if (product.variants?.length) {
          this.maxQuantity = Math.max(...product.variants.map((v: { stock: number }) => v.stock));
        }
      },
      error: (error: Error) => {
        console.error('Error loading product details:', error);
      }
    });
  }

  changeImage(image: string) {
    if (this.selectedImage === image) return;
    this.imageState = 'changing';
    setTimeout(() => {
      this.selectedImage = image;
    }, 300);
  }

  onImageAnimationComplete() {
    if (this.imageState === 'changing') {
      this.imageState = 'initial';
    }
  }

  selectVariant(variant: any) {
    if (variant.stock === 0) return;
    this.selectedVariantId = variant.product_variant_id;
    this.selectedVariant = variant;
    this.maxQuantity = variant.stock;
    if (this.quantity > variant.stock) {
      this.quantity = variant.stock;
    }
    this.showSizeError = false;
  }

  incrementQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.selectedVariantId) {
      this.showSizeError = true;
      return;
    }

    this.isAddingToCart = true;
    this.cartService.addItem(this.selectedVariantId, this.quantity).subscribe({
      next: () => {
        this.isAddingToCart = false;
        // Здесь можно добавить уведомление об успешном добавлении
      },
      error: (error) => {
        this.isAddingToCart = false;
        console.error('Error adding to cart:', error);
        // Здесь можно добавить уведомление об ошибке
      }
    });
  }

  toggleWishlist() {
    if (!this.product) return;

    if (this.product.in_wishlist) {
      this.productDetailService.removeFromWishList(this.product.product_id).subscribe({
        next: () => {
          if (this.product) {
            this.product.in_wishlist = false;
          }
        },
        error: (error: Error) => {
          console.error('Error removing from wishlist:', error);
        }
      });
    } else {
      this.productDetailService.addToWishList(this.product.product_id).subscribe({
        next: () => {
          if (this.product) {
            this.product.in_wishlist = true;
          }
        },
        error: (error: Error) => {
          console.error('Error adding to wishlist:', error);
        }
      });
    }
  }
} 