import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Banner section -->
    <div class="banner" style="background-image: url('assets/images/main-header-image.png');">
      <div class="banner-content">
        <h1>LOOK YOUR BEST</h1>
        <h2>FOR YOUR GOOD MOOD</h2>
        <button class="btn-primary" routerLink="/products">New Arrivals</button>
      </div>
    </div>

    <!-- Featured Products section -->
    <section class="featured-products">
      <h2>FEATURED PRODUCTS</h2>
      <div class="view-all">
        <button class="btn-secondary" routerLink="/products">View All</button>
      </div>
      <div class="product-grid">
        <div class="product-card" *ngFor="let product of featuredProducts">
          <div class="product-image" (click)="navigateToProduct(product.product_id)">
            <img [src]="product.main_image_url" [alt]="product.name">
            <div class="product-overlay">
              <button class="quick-view-btn">Quick View</button>
            </div>
          </div>
          <div class="product-info">
            <h3 (click)="navigateToProduct(product.product_id)">{{product.name}}</h3>
            <div class="product-footer">
              <p class="price">{{product.price}} ₽</p>
              <button class="wishlist-btn" (click)="toggleWishlist(product)" [class.in-wishlist]="product.in_wishlist">
                <span class="heart-icon">♥</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Made to Order section -->
    <section class="made-to-order" style="background-image: url('assets/images/main-body-image.png'); background-size: cover; background-position: center; width: 100%; height: 40vh;">
      <div class="content">
        <h2>Made-To-Order</h2>
        <button class="btn-primary" routerLink="/services">LEARN MORE</button>
      </div>
    </section>

    <!-- Shop Collection section -->
    <section class="shop-collection">
      <h2>SHOP COLLECTION</h2>
      <div class="collection-grid">
        <div class="collection-card" *ngFor="let collection of collections">
          <div class="collection-image">
            <img [src]="collection.image" [alt]="collection.name">
            <div class="collection-overlay">
              <h3>{{collection.name}}</h3>
              <button class="btn-primary" routerLink="/products">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features section -->
    <section class="features">
      <div class="feature-card">
        <h3>Quality</h3>
        <p>Our objective is to provide a seamless shopping journey, from browsing to purchase, ensuring convenience and satisfaction.</p>
      </div>
      <div class="feature-card">
        <h3>Customisability</h3>
        <p>There are many styles to select from when you browse through our gallery. Every detail identifies your style.</p>
      </div>
      <div class="feature-card">
        <h3>Convenience</h3>
        <p>We deliver directly to your home, the office, or on location, so you have the minimum of interruptions.</p>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .banner {
      position: relative;
      height: 600px;
      background-size: cover;
      background-position: center;
      color: white;
    }

    .banner-content {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: left;
    }

    .banner-content h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .banner-content h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .btn-primary {
      background-color: #8B6B0B;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    .btn-primary:hover {
      background-color: #6d5409;
    }

    .featured-products {
      padding: 4rem 0;
      text-align: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    .view-all {
      margin: 2rem 0;
    }

    .btn-secondary {
      background-color: transparent;
      color: #8B6B0B;
      border: 2px solid #8B6B0B;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    }

    .btn-secondary:hover {
      background-color: #8B6B0B;
      color: white;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
      padding: 2rem;
    }

    .product-card {
      text-align: center;
      cursor: pointer;
      transition: transform 0.3s;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .product-card:hover {
      transform: translateY(-5px);
    }

    .product-image {
      position: relative;
      width: 100%;
      padding-top: 133%;
      overflow: hidden;
    }

    .product-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .product-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .product-image:hover .product-overlay {
      opacity: 1;
    }

    .quick-view-btn {
      background: white;
      color: #333;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transform: translateY(20px);
      transition: transform 0.3s;
    }

    .product-image:hover .quick-view-btn {
      transform: translateY(0);
    }

    .product-info {
      padding: 1rem;
    }

    .product-info h3 {
      margin: 0.5rem 0;
      font-size: 1.1rem;
      color: #333;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
    }

    .price {
      color: #8B6B0B;
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0;
    }

    .wishlist-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      font-size: 1.5rem;
      color: #ccc;
      transition: all 0.3s ease;
    }

    .wishlist-btn:hover {
      transform: scale(1.1);
    }

    .wishlist-btn.in-wishlist {
      color: #ff4b4b;
    }

    .heart-icon {
      display: inline-block;
      transition: transform 0.3s ease;
    }

    .wishlist-btn:hover .heart-icon {
      transform: scale(1.2);
    }

    .made-to-order {
      background-image: url('/assets/images/made-to-order.jpg');
      background-size: cover;
      background-position: center;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }

    .shop-collection {
      padding: 4rem 0;
      text-align: center;
      background: #f5f5f5;
    }

    .collection-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .collection-card {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 1;
    }

    .collection-image {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .collection-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    .collection-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .collection-card:hover .collection-image img {
      transform: scale(1.1);
    }

    .collection-card:hover .collection-overlay {
      opacity: 1;
    }

    .collection-overlay h3 {
      color: white;
      font-size: 2rem;
      margin-bottom: 1rem;
      transform: translateY(-20px);
      transition: transform 0.3s;
    }

    .collection-overlay button {
      transform: translateY(20px);
      transition: transform 0.3s;
    }

    .collection-card:hover .collection-overlay h3,
    .collection-card:hover .collection-overlay button {
      transform: translateY(0);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 4rem 2rem;
      background-color: white;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      text-align: center;
      padding: 2rem;
    }

    .feature-card img {
      width: 64px;
      height: 64px;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      margin-bottom: 1rem;
      color: #8B6B0B;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    @media (max-width: 1200px) {
      .product-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .collection-grid {
        grid-template-columns: 1fr;
      }

      .features {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  collections = [
    {
      name: 'Men',
      image: 'assets/images/collection-men.jpg'
    },
    {
      name: 'Women',
      image: 'assets/images/collection-women.jpg'
    },
    {
      name: 'Accessories',
      image: 'assets/images/collection-accessories.jpg'
    }
  ];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts() {
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 5);
      },
      error: (error) => {
        console.error('Error loading featured products:', error);
      }
    });
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  toggleWishlist(product: Product) {
    if (product.in_wishlist) {
      this.productService.removeFromWishList(product.product_id).subscribe({
        next: () => {
          product.in_wishlist = false;
        },
        error: (error) => {
          console.error('Error removing from wishlist:', error);
        }
      });
    } else {
      this.productService.addToWishList(product.product_id).subscribe({
        next: () => {
          product.in_wishlist = true;
        },
        error: (error) => {
          console.error('Error adding to wishlist:', error);
        }
      });
    }
  }
} 