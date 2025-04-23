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
        <ng-container *ngIf="authService.isAuthenticated(); else authButtons">
          <a routerLink="/profile" class="icon-button">
            <img src="assets/icons/navigation/profile.svg" alt="user" class="bi bi-person-fill">
          </a>
          <a routerLink="/cart" class="icon-button">
            <img src="assets/icons/navigation/cart.svg" alt="user" class="bi bi-person-fill">
          </a>
        </ng-container>
        <ng-template #authButtons>
          <a routerLink="/auth/login" class="icon-button">
            <img src="assets/images/login.png" alt="login" class="bi bi-box-arrow-in-right">
          </a>
          <a routerLink="/auth/register" class="icon-button">
            <img src="assets/images/register.png" alt="register" class="bi bi-person-plus-fill">
          </a>
        </ng-template>
        <button class="icon-button">
          <img src="assets/icons/navigation/search.svg" alt="search" class="bi bi-search">
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
      text-decoration: none;
    }

    .icon-button:hover {
      color: #27235C;
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
