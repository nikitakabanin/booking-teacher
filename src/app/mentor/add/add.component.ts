import { Component, inject } from '@angular/core';
import { Orders, Order } from '../../models';
import { DatePipe, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from '../../submit-dialog/submit-dialog.component';
import { BookingService } from '../../booking/booking.service';
import { Observable } from 'rxjs';
import { HttpService } from '../../http.service';
@Component({
  selector: 'app-available',
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
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  availableOrders: Orders = { orders: [] };
  private readonly dialog = inject(MatDialog);
  private readonly http = inject(HttpService);
  public displayedColumns = ['time', 'client', 'subject', 'price', 'mentor'];

  private readonly bookingService = inject(BookingService);
  private readonly freeOrders$: Observable<Orders>;
  constructor() {
    this.freeOrders$ = this.bookingService.getFreeOrders();
    this.freeOrders$.subscribe((e) => (this.availableOrders = e));
  }
  submitBooking(element: Order) {
    this.dialog
      .open(SubmitDialogComponent, { data: element })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (!res) return;
        this.bookingService.addFreeOrders(element);
      });
  }
  add(order: Order | undefined = undefined) {
    this.http.add(order).subscribe((v) => console.log(v));
  }
}
