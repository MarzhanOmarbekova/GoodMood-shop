import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="mega-sale">
      <span>MEGA SALE</span>
      <span>Take 10% OFF</span>
    </div>
    <nav class="navbar">
      <div class="nav-left">
        <a routerLink="/" class="logo">
          <span>GOODMOOD</span>
        </a>
      </div>
      
      <div class="nav-center">
        <a routerLink="/products">PRODUCTS</a>
        <a routerLink="/styles">STYLES</a>
        <a routerLink="/services">SERVICES</a>
        <a routerLink="/contact">CONTACT</a>
      </div>
      
      <div class="nav-right">
        <a routerLink="/profile" class="icon-button">
          <i class="fas fa-user"></i>
        </a>
        <a routerLink="/cart" class="icon-button">
          <i class="fas fa-shopping-cart"></i>
        </a>
        <button class="icon-button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .mega-sale {
      background-color: #8B6B0B;
      color: white;
      text-align: center;
      padding: 8px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .navbar {
      background-color: #FAEDDF;
      padding: 15px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #EAEAEA;
    }

    .nav-left .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #27235C;
      font-weight: bold;
    }

    .nav-left .logo img {
      height: 30px;
    }

    .nav-center {
      display: flex;
      gap: 40px;
    }

    .nav-center a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-center a:hover {
      color: #27235C;
    }

    .nav-right {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .icon-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #333;
      font-size: 18px;
      padding: 8px;
      transition: color 0.3s;
    }

    .icon-button:hover {
      color: #27235C;
    }
  `]
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}
} 