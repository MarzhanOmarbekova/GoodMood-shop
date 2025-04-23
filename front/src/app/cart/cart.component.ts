import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {CartItem, CartResponse} from '../models/cart.model'
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  loading: boolean = true;
  updatingItems: Set<number> = new Set();

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (data: CartResponse) => {
        this.cartItems = data.cart_items;
        this.totalPrice = data.total_price;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
        this.loading = false;
      }
    });
  }

  incrementQuantity(item: CartItem): void {
    if (item.quantity < item.stock) {
      this.updateQuantity(item, item.quantity + 1);
    }
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateQuantity(item, item.quantity - 1);
    }
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1 || newQuantity > item.stock || this.updatingItems.has(item.product_variant_id)) {
      return;
    }

    this.updatingItems.add(item.product_variant_id);
    
    this.cartService.updateItem(item.product_variant_id, newQuantity).subscribe({
      next: () => {
        this.fetchCart();
        this.updatingItems.delete(item.product_variant_id);
      },
      error: (error) => {
        console.error('Error updating quantity:', error);
        this.updatingItems.delete(item.product_variant_id);
      }
    });
  }

  removeFromCart(productVariantId: number) {
    if (this.updatingItems.has(productVariantId)) {
      return;
    }

    this.updatingItems.add(productVariantId);
    this.cartService.removeItem(productVariantId).subscribe({
      next: () => {
        this.fetchCart();
        this.updatingItems.delete(productVariantId);
      },
      error: (error) => {
        console.error('Error removing item:', error);
        this.updatingItems.delete(productVariantId);
      }
    });
  }

  checkout(): void {
    // TODO: Implement checkout functionality
    alert('Оформление заказа пока не реализовано');
  }

  isUpdating(productVariantId: number): boolean {
    return this.updatingItems.has(productVariantId);
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/product', productId.toString()]);
  }
}
