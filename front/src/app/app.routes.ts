import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard, LoginGuard } from './auth/auth.guard';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'auth',
        canActivate: [LoginGuard],
        children: [
          {
            path: 'login',
            loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
          },
          {
            path: 'register',
            loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
          }
        ]
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'wishlist',
        canActivate: [AuthGuard],
        loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent)
      },
      {
        path: 'cart',
        canActivate: [AuthGuard],
        loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];
