import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserLoginRes, Order, UserRegReq, UserLoginReq } from './models';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://26.35.147.101:8080';

  private readonly error$ = new Subject<void>();
  constructor() {}
  // setUserLogin(value: string) {
  //   this.userLogin = value;
  // }
  getError$() {
    return this.error$.asObservable();
  }
  public register(user: UserRegReq) {
    return this.http.post<UserLoginRes>(
      `http://${this.baseUrl}/register`,
      user
    );
  }
  public login(user: UserLoginReq) {
    return this.http.post<UserLoginRes>(`${this.baseUrl}/login`, user);
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
  public add(order: Order) {
    return this.http.post<any>(`${this.baseUrl}/add`, { order });
  }
  // public login(user: UserLogin): Observable<LoginResponse> {
  //   return of({ response: true, jwt: 'erwe', status: 'admin', name: 'Andrew' });
  // }
  // public register(user: UserLogin): Observable<LoginResponse> {
  //   return of({ response: true, jwt: 'erwe', status: 'client', name: 'Ilya' });
  // }
}
