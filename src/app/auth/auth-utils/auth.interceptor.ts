import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { tap, Observable, catchError, throwError } from 'rxjs';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';

export const AuthInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const jwt = inject(JwtService);
  const auth = inject(AuthService);
  const authToken = jwt.getToken();
  const authReq = req.clone({
    headers: req.headers.set('Authorization', authToken),
  });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        jwt.removeToken();
        auth.logout();
      }
      return throwError(() => err);
    })
  );
};
