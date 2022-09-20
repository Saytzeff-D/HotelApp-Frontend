import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

  public filterUser;
  public bookingRecords:any = []
  public isLoading = true
  constructor(public server: LaravelServerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.server.allBookings().subscribe(data=>{
      console.log(data)
      this.bookingRecords = data
      this.isLoading = false
    })
  }

  checkOut(booking): any{
    booking.type = 'checkOut';
    this.dialog.open(DialogComponent, { data: booking });
  }
}
