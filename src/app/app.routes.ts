import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';

import { BookedComponent } from './booked/booked.component';
import { loginGuard } from './auth/auth-utils/login.guard';
import { AvailableComponent } from './available/available.component';

export const routes: Routes = [
  { path: 'auth', component: AuthPageComponent, canDeactivate: [loginGuard] },
  { path: 'booked', component: BookedComponent },
  { path: 'available', component: AvailableComponent },
  { path: '**', redirectTo: 'available', pathMatch: 'full' },
];
