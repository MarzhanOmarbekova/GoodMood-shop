import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {RegisterData} from '../../models/auth.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formData: RegisterData = {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    address: "",
    phone_number: "",
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  register() {
    this.authService.register(this.formData).subscribe( {
      next: (res) => {
        console.log('Registration successful:', res);
        alert('You have registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Registration failed!');
      }
    })
  }

}
