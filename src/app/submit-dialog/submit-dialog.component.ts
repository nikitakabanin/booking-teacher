import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Order } from '../models';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-submit-dialog',
  standalone: true,
  imports: [MatDialogModule, MatListModule, DatePipe, MatButtonModule],
  templateUrl: './submit-dialog.component.html',
  styleUrl: './submit-dialog.component.scss',
})
export class SubmitDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Order) {}
}
