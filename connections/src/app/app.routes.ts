import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './pages/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup-page/signup-page.component').then(
        (c) => c.SignupPageComponent
      ),
    title: 'Registration',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/auth/signin-page/signin-page.component').then(
        (c) => c.SigninPageComponent
      ),
    title: 'Login',
  },
  { path: '', component: MainComponent, canActivate: [authGuard] },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (c) => c.ProfilePageComponent
      ),
    title: 'Profile',
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (c) => c.NotFoundPageComponent
      ),
    title: 'Page not found',
  },
];
