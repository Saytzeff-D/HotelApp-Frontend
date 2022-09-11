import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../register/register.component';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  myControl = new FormControl();
  public roomCategory = ''
  public savedRoomData:any = JSON.parse(sessionStorage.getItem('roomInfo'))
  // public savedRoomCategory = (this.savedRoomData.roomCategory !== '')? this.savedRoomData.roomCategory:sessionStorage.getItem('roomCategory')
  public noSpinnerShow = true
  public dontShowWord = false
  public dateDiff:any = ''
  public categories = ['Family Room', 'Single Room', 'Deluxe Room', 'Executive']

  public bookRoom = new FormGroup({
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
    numOfRooms: new FormControl(''),
    numOfGuests: new FormControl(''),
    roomCategory: new FormControl(sessionStorage.getItem('roomCategory'))
  })
  matcher = new MyErrorStateMatcher()
  constructor(public server: LaravelServerService, public router: Router) {
    // this.savedRoomData = sessionStorage.getItem('roomInfo')
  }
  public error = ''

  ngOnInit(): void {
    sessionStorage.removeItem('route')
    sessionStorage.removeItem('roomInfo')
  }

  bookNow(){
    this.error = ''
    this.bookRoom.value.numOfNights = this.dateDiff
    sessionStorage.removeItem('bookRoomInfo')
    sessionStorage.removeItem('roomCategory')
    if (this.bookRoom.value.checkIn && this.bookRoom.value.checkOut && this.bookRoom.value.numOfNights && this.bookRoom.value.numOfRooms && this.bookRoom.value.numOfGuests && this.bookRoom.value.roomCategory !== '' && this.bookRoom.value.roomCategory !== null) {
        this.noSpinnerShow = false
        this.dontShowWord = true
        const roomInfo = {roomCategory: this.bookRoom.value.roomCategory, numOfRooms: this.bookRoom.value.numOfRooms}
        this.server.checkAvailableRoom(roomInfo).subscribe(res=>{
          console.log(res)
          if (res == 'Checked') {
            sessionStorage.setItem('roomInfo', JSON.stringify(this.bookRoom.value))
            this.router.navigate(['payNow'])
          } else {
            this.noSpinnerShow = true
            this.dontShowWord = false
            this.error = 'This room is unavailable at the moment'
          }
        }, error=>{
          console.log(error)
          console.log(error.error.message)
          if (error.error.message == 'Token has expired' || error.error.message == 'Wrong number of segments') {
            sessionStorage.setItem('route', 'Book-Room')
            sessionStorage.setItem('infoMsg', 'Please Login to continue')
            sessionStorage.setItem('bookRoomInfo', JSON.stringify(this.bookRoom.value))
            this.router.navigate(['login'])
          }
          else{
            this.noSpinnerShow = true
            this.dontShowWord = false
            this.error = 'Unable to Process your request at this time'
          }
        })
    } else {
      this.error = 'All fields are Required'
    }
  }
  checkDateDiff(){
    if(this.bookRoom.value.checkIn && this.bookRoom.value.checkOut !== ''){
      let checkIn = new Date(this.bookRoom.value.checkIn)
    let checkOut = new Date(this.bookRoom.value.checkOut)
    let Time = checkOut.getTime() - checkIn.getTime()
    this.dateDiff = Time/(1000 * 3600 * 24)
    this.bookRoom.value.numOfNights = Time/(1000 * 3600 * 24)
    console.log(this.bookRoom.value.numOfNights)
    }
  }

  dismissAlert(){
    this.error = ''
  }

}
