import { Injectable, inject } from '@angular/core';
import { Orders, Order } from '../models';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private freeOrders = new BehaviorSubject<Orders>({ orders: [] });
  private bookedByClientOrders = new BehaviorSubject<Orders>({ orders: [] });
  private readonly http = inject(HttpService);
  constructor() {}
  getFreeOrders() {
    return this.http.available();
  }
  getBookedOrders() {
    return this.http.booked();
  }
  addFreeOrders(value: Order) {
    // const initial = this.freeOrders.value;
    // initial.orders = [...new Set([...initial.orders, ...value.orders])];
    // this.freeOrders.next(initial);
    return this.http.add(value);
  }
  deleteFreeOrder(order: Order) {
    return this.http.deleteAvailableOrder(order);
  }
  deleteBookedOrder(order: Order) {
    return this.http.deleteBookedOrder(order);
  }
  addBookedOrders(value: Orders) {
    const initial = this.bookedByClientOrders.value;
    initial.orders = [...new Set([...initial.orders, ...value.orders])];
    this.bookedByClientOrders.next(initial);
  }
  deleteBookedOrders(value: Order) {
    const initial = this.bookedByClientOrders.value;
    initial.orders.filter(
      (e) => e.time !== value.time || e.mentor !== value.mentor
    );
    this.bookedByClientOrders.next(initial);
  }
}
