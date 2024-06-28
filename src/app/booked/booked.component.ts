import { Component, booleanAttribute, inject } from '@angular/core';
import { Orders, Order } from '../models';
import { DatePipe, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { BookingService } from '../booking/booking.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-booked',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    DatePipe,
    MatButton,
    MatIconModule,
  ],
  templateUrl: './booked.component.html',
  styleUrl: './booked.component.scss',
})
export class BookedComponent {
  bookingService = inject(BookingService);
  bookedOrders: Orders = { orders: [] };
  public displayedColumns = ['time', 'client', 'subject', 'price', 'mentor'];
  dialog = inject(MatDialog);
  private bookedOrders$: Observable<Orders>;
  constructor() {
    this.bookedOrders$ = this.bookingService.getBookedOrders();
    this.bookedOrders$.subscribe((v) => (this.bookedOrders = v));
  }
  cancelBooking(element: Order) {
    this.dialog
      .open(SubmitDialogComponent, { data: element })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.bookingService.deleteBookedOrders(element);
        // this.bookedOrders.orders = this.bookedOrders.orders.filter(
        //   (e) => e.time !== element.time
        // );
      });
  }
}
