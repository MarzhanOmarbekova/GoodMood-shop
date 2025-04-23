import { Component } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {LoginData} from '../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials: LoginData = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        this.router.navigate(['/home']);
        alert("Login successful" + res.access);
        // Copy access token to clipboard
        navigator.clipboard.writeText(res.access).then(() => {
          console.log('Token copied to clipboard');
        }).catch(err => {
          console.error('Failed to copy token:', err);
        });
      },
      error: (err) => {
        console.log('Login error details:', err);
        alert("Login failed: " + (err.error?.detail || 'Unknown error'));
      }
    });
}
}
