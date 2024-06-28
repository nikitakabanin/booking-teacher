import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

export const isClientGuard: CanDeactivateFn<Observable<boolean>> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const auth = inject(AuthService);
  return auth.getUser$().pipe(map((v) => v?.role === 'client'));
};
