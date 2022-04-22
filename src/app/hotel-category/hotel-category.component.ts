import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-hotel-category',
  templateUrl: './hotel-category.component.html',
  styleUrls: ['./hotel-category.component.css']
})
export class HotelCategoryComponent implements OnInit {

  public rooms:any = []
  public currentIndex = 0
  public roomGroups = []
  constructor(public server: LaravelServerService, public router: Router) { }

  ngOnInit(): void {
    this.server.getMethod('roomDetails').subscribe(details=>{
      this.rooms = details
      this.multipleRoomArray()
    })
  }
  multipleRoomArray(){
    this.rooms.map((each, i)=>{
      if(this.currentIndex < this.rooms.length){
        let slicedRooms = this.rooms.slice(this.currentIndex, this.currentIndex + 3)
        console.log(slicedRooms)
        this.roomGroups = [...this.roomGroups, slicedRooms]
        this.currentIndex = this.currentIndex + 3
      }
      else{
        console.log('No more array to duplicate')
      }
    })
  }
  clickBook(roomCategory){
    sessionStorage.setItem('roomCategory', roomCategory)
    this.router.navigate(['book-room'])
  }

}
