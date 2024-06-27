import { CanDeactivateFn } from '@angular/router';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { Observable, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const loginGuard: CanDeactivateFn<AuthPageComponent> = (
  component: AuthPageComponent,
  currentRoute,
  currentState,
  nextState
): Observable<boolean> => {
  const auth = inject(AuthService);
  return auth.getUser().pipe(map((value) => value?.response || true));
};
