import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {CartItem, CartResponse} from '../models/cart.model'
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  ngOnInit() {
    this.fetchCart();
  }

  constructor(private cartService: CartService) { }

  fetchCart() {
    this.cartService.getCart().subscribe((data: CartResponse) => {
      this.cartItems = data.cart_items;
      this.totalPrice = data.total_price;
    })
  }

  updateQuantity(item: CartItem, change: number) {
    const newQuantity = item.quantity + change
    if (newQuantity<1 || newQuantity>item.stock) return;

    this.cartService.updateItem(item.product_variant_id, newQuantity).subscribe(() => this.fetchCart());
  }

  removeItem(productVariantId: number) {
    this.cartService.removeItem(productVariantId).subscribe(() => this.fetchCart());
  }

  checkout(): void {
    alert('Оформление заказа пока не реализовано');
  }
}
