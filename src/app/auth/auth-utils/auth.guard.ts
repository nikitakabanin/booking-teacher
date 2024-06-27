import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const auth = inject(AuthService);
  return auth.getUser().pipe(map((res) => (res ? res.response : false)));
};
