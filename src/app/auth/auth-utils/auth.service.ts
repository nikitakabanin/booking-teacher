import { Injectable, inject } from '@angular/core';
import { LoginResponse, UserLogin } from '../../models';
import { BehaviorSubject, take } from 'rxjs';
import { HttpService } from '../../http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly responseData = new BehaviorSubject<
    LoginResponse | undefined
  >(undefined);
  private readonly http = inject(HttpService);
  constructor() {}

  public login(user: UserLogin) {
    this.http
      .login(user)
      .pipe(take(1))
      .subscribe((res) => this.responseData.next(res));
  }
  public register(user: UserLogin) {
    this.http
      .register(user)
      .pipe(take(1))
      .subscribe((res) => this.responseData.next(res));
  }
  public logout() {
    this.responseData.next(undefined);
  }
  getUser() {
    return this.responseData.asObservable();
  }
}
