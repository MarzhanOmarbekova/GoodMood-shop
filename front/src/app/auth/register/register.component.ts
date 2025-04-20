import { Component } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formData = {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    address: "",
    phone_number: "",
  }

  constructor(private authService: AuthService) {
  }

  register() {
    this.authService.register(this.formData).subscribe( {
      next: (res) => {
        console.log('Registration successful:', res);
        alert('You have registered successfully!');
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Registration failed!');
      }
    })
  }

}
