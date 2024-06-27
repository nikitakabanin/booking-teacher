import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginResponse, Order, Orders, UserLogin } from './models';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://26.35.147.101:8080';
  private userLogin?: string = '';
  constructor() {}
  setUserLogin(value: string) {
    this.userLogin = value;
  }
  public register(user: UserLogin) {
    return this.http.post<LoginResponse>(
      `http://${this.baseUrl}/register`,
      user
    );
  }
  public login(user: UserLogin) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user);
  }
  public available() {
    return this.http.get<any>(`${this.baseUrl}/available`);
  }
  public book(order: Order) {
    return this.http.post<any>(`${this.baseUrl}/book`, order);
  }
  public booked() {
    return this.http.get<any>(`${this.baseUrl}/booked`);
  }
  // public login(user: UserLogin): Observable<LoginResponse> {
  //   return of({ response: true, jwt: 'erwe', status: 'admin', name: 'Andrew' });
  // }
  // public register(user: UserLogin): Observable<LoginResponse> {
  //   return of({ response: true, jwt: 'erwe', status: 'client', name: 'Ilya' });
  // }
}
