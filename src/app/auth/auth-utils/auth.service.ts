import { Injectable, OnDestroy, inject } from '@angular/core';
import { UserLoginReq, UserLoginRes, UserRegReq } from '../../models';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { HttpService } from '../../http.service';
import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private readonly responseData = new BehaviorSubject<UserLoginRes | undefined>(
    undefined
  );
  private readonly http = inject(HttpService);
  private readonly jwt = inject(JwtService);
  private readonly destroy$ = new Subject<void>();
  constructor() {
    this.responseData
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => value && this.jwt.setToken(value.jwt));
  }

  public login(user: UserLoginReq) {
    this.http
      .login(user)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => this.responseData.next(res));
  }
  public register(user: UserRegReq) {
    this.http
      .register(user)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => this.responseData.next(res));
  }
  public logout() {
    this.responseData.next(undefined);
  }
  getUser$() {
    return this.responseData.asObservable();
  }
  getUser() {
    return this.responseData.value;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
