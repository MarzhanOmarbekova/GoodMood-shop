import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Banner section -->
    <div class="banner" style="background-image: url('assets/images/main-header-image.png'); background-size: cover; background-position: center; width: 100%; height: 60vh;">
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
          <img [src]="product.image" [alt]="product.name">
          <h3>{{product.name}}</h3>
          <p class="price">₹{{product.price}}</p>
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
          <img [src]="collection.image" [alt]="collection.name">
          <h3>{{collection.name}}</h3>
        </div>
      </div>
    </section>

    <!-- Features section -->
    <section class="features">
      <div class="feature-card">
        <img src="assets/icons/quality.svg" alt="Quality">
        <h3>Quality</h3>
        <p>Our objective is to provide a seamless shopping journey, from browsing to purchase, ensuring convenience and satisfaction in both physical and online stores.</p>
      </div>
      <div class="feature-card">
        <img src="assets/icons/customise.svg" alt="Customisability">
        <h3>Customisability</h3>
        <p>There are many styles to select from when you browse through our gallery. Every detail identifies your style. At the collaboration, you have complete control over the design process.</p>
      </div>
      <div class="feature-card">
        <img src="assets/icons/convenience.svg" alt="Convenience">
        <h3>Convenience</h3>
        <p>We deliver directly to your home, the office, or on location, so you have the minimum of interruptions during your busy schedule.</p>
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
      background-image: url('/assets/images/banner.jpg');
      background-size: cover;
      background-position: center;
      color: white;
    }

    .mega-sale {
      background-color: #8B6B0B;
      color: white;
      text-align: center;
      padding: 10px;
      font-weight: bold;
    }

    .banner-content {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: left;
    }

    .view-all{
        margin-top: 30px;
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
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 2rem;
    }

    .product-card {
      text-align: center;
    }

    .product-card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
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
    }

    .collection-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 2rem;
    }

    .collection-card {
      position: relative;
      overflow: hidden;
      border-radius: 4px;
    }

    .collection-card img {
      width: 100%;
      height: auto;
      transition: transform 0.3s;
    }

    .collection-card:hover img {
      transform: scale(1.05);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 4rem 2rem;
      background-color: #f5f5f5;
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
    }

    @media (max-width: 768px) {
      .collection-grid {
        grid-template-columns: 1fr;
      }

      .features {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  featuredProducts = [
    { name: 'Trousers', price: '699', image: 'assets/images/products/trousers.jpg' },
    { name: 'Vintage Coat', price: '699', image: 'assets/images/products/vintage-coat.jpg' },
    { name: 'Roxie Red Overshirt', price: '699', image: 'assets/images/products/red-overshirt.jpg' },
    { name: 'Flowered Jacket', price: '699', image: 'assets/images/products/flowered-jacket.jpg' },
    { name: 'Marron Overshirt', price: '699', image: 'assets/images/products/marron-overshirt.jpg' }
  ];

  collections = [
    { name: 'Street Wear', image: 'assets/images/collections/street-wear.jpg' },
    { name: 'Vintage', image: 'assets/images/collections/vintage.jpg' },
    { name: 'Classic', image: 'assets/images/collections/classic.jpg' }
  ];
} 