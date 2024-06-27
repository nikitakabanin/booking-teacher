import { Injectable } from '@angular/core';
import { Orders, Order } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private freeOrders = new BehaviorSubject<Orders>({ orders: [] });
  private bookedByClientOrders = new BehaviorSubject<Orders>({ orders: [] });
  constructor() {}
  getFreeOrders() {
    return this.freeOrders.asObservable();
  }
  getBookedOrders() {
    return this.bookedByClientOrders.asObservable();
  }
  addFreeOrders(value: Orders) {
    const initial = this.freeOrders.value;
    initial.orders = [...new Set([...initial.orders, ...value.orders])];
    this.freeOrders.next(initial);
  }
  deleteFreeOrder(value: Order) {
    const initial = this.freeOrders.value;
    initial.orders.filter(
      (e) => e.time !== value.time || e.mentor !== value.mentor
    );
    initial.orders = [...new Set([...initial.orders, value])];
    this.freeOrders.next(initial);
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
