import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product, Category } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading: boolean = true;
  selectedCategory: string | undefined = undefined;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadProducts(category?: string): void {
    this.loading = true;
    this.productService.getProducts(category).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  selectCategory(category: Category | null): void {
    this.selectedCategory = category?.code;
    this.loadProducts(this.selectedCategory);
  }

  toggleWishlist(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
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

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
} 