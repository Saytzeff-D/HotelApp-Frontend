import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public loggedUser:any = {}
  public rooms:any = []
  public currentIndex = 0
  public roomGroups = []
  constructor(public server: LaravelServerService, public router: Router) {
    server.user.subscribe(obj=>{
      this.loggedUser = obj
    })
  }

  ngOnInit(): void {
    this.server.getMethod('roomDetails').subscribe(data=>{
      console.log(data)
      this.rooms = data
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
