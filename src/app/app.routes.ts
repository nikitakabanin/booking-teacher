import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';

import { BookedComponent } from './booked/booked.component';
import { loginGuard } from './auth/auth-utils/login.guard';
import { AvailableComponent } from './available/available.component';
import { AddComponent } from './mentor/add/add.component';
import { isClientGuard } from './auth/auth-utils/is-client.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthPageComponent, canDeactivate: [loginGuard] },
  { path: 'booked', component: BookedComponent, canActivate: [loginGuard] },
  {
    path: 'available',
    component: AvailableComponent,
    canActivate: [loginGuard],
  },
  { path: 'add', component: AddComponent, canDeactivate: [isClientGuard] },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
