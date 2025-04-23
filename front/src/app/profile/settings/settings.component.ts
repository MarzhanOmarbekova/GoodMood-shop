import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../models/profile.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  @Input() profile: UserProfile = {
    name: '',
    email: '',
    avatar: '',
    orders: [],
    wishlist: []
  };

  constructor(public authService: AuthService) {}
} 