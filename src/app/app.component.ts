import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly http = inject(HttpService);
  title = 'booking-teacher';
  mock() {
    this.http.available().subscribe((v) => console.log(v));
  }
  book() {
    this.http
      .book({
        time: '2022-02-22T22:00',
        client: 'Lll',
        mentor: 'Qer',
        subject: 'rqrw',
        price: 1000,
      })
      .subscribe((v) => console.log(v));
  }
  booked() {
    this.http.booked().subscribe((v) => console.log(v));
  }
}
