import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <footer class="footer">
      <div class="footer-section">
        <h3>SIGN UP AND SAVE</h3>
        <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <div class="subscribe-form">
          <input 
            type="email" 
            [(ngModel)]="email" 
            placeholder="Enter Your Email"
            (keyup.enter)="subscribe()">
          <button (click)="subscribe()">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        <div class="social-links">
          <a href="https://instagram.com" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      <div class="footer-section">
        <h3>LOCATION</h3>
        <p>007,James bond street,<br>London,<br>England.</p>
        <p>Mon-Sat 10AM - 9PM<br>Sun:Closed</p>
      </div>

      <div class="footer-section">
        <h3>HELP</h3>
        <ul>
          <li><a routerLink="/about">About</a></li>
          <li><a routerLink="/faq">FAQ</a></li>
          <li><a routerLink="/services">Services</a></li>
          <li><a routerLink="/contact">Contact</a></li>
          <li><a routerLink="/returns">Start a Return or Exchange</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>SERVICES</h3>
        <ul>
          <li><a routerLink="/tailoring">Tailoring</a></li>
          <li><a routerLink="/made-to-measure">Made-to-Measure</a></li>
          <li><a routerLink="/made-to-order">Made-to-Order</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>POLICIES</h3>
        <ul>
          <li><a routerLink="/orders">Orders</a></li>
          <li><a routerLink="/returns">Returns</a></li>
          <li><a routerLink="/terms">Terms and Conditions</a></li>
          <li><a routerLink="/privacy">Privacy and policy</a></li>
          <li><a routerLink="/gifts">Gifts</a></li>
          <li><a routerLink="/refund">Refund Policy</a></li>
        </ul>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #4A4A4A;
      color: white;
      padding: 60px 40px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 30px;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      line-height: 1.6;
      color: #E0E0E0;
    }

    .subscribe-form {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    input {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-bottom: 1px solid white;
      background: transparent;
      color: white;
      font-size: 14px;
    }

    input::placeholder {
      color: #E0E0E0;
    }

    input:focus {
      outline: none;
      border-bottom-color: #8B6B0B;
    }

    button {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
    }

    button:hover {
      color: #8B6B0B;
    }

    .social-links {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }

    .social-links a {
      color: white;
      font-size: 20px;
      text-decoration: none;
    }

    .social-links a:hover {
      color: #8B6B0B;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    ul li {
      margin-bottom: 10px;
    }

    ul li a {
      color: #E0E0E0;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s;
    }

    ul li a:hover {
      color: #8B6B0B;
    }

    @media (max-width: 1024px) {
      .footer {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .footer {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .footer {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  email: string = '';

  subscribe() {
    if (this.email) {
      console.log('Subscribing email:', this.email);
      // Here you would typically make an API call to subscribe the email
      this.email = ''; // Clear the input after submission
    }
  }
} 