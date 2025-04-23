import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/profile.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  @Input() orders: Order[] = [];
} 