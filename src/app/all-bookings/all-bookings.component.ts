import { Component, OnInit } from '@angular/core';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

  public filterUser;
  public bookingRecords:any = []
  constructor(public server: LaravelServerService) { }

  ngOnInit(): void {
    this.server.allBookings().subscribe(data=>{
      console.log(data)
      this.bookingRecords = data
    })
  }

}
