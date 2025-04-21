import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
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

  constructor(private authService: AuthService) {
  }

  login() {
    this.authService.login(this.credentials).subscribe( {
      next: (res) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        alert("Login successful");
      },
      error: (err) => {
        console.log('Login error:' ,err);
        alert("Login failed :(")
      }
    })
  }
}
