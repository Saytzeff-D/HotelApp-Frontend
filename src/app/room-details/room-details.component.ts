import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  public categories = ['Family Room', 'Single Room', 'Deluxe Room', 'Executive']
  public picture;
  public isLoading = true
  public noSpinnerShow = true
  public roomDetails = new FormGroup({
    room_category: new FormControl(''),
    price: new FormControl(''),
    numOf_available_rooms: new FormControl('')
  })
  public details: any = [];
  constructor(
    public server: LaravelServerService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.server.getMethod('roomDetails').subscribe(data=>{
      this.details = data;
      this.isLoading = false;
    });
  }

  getThePicFile(event){
    this.picture = event.target.files[0]
  }
  uploadDetails(){
    console.log(this.picture, this.roomDetails.value)
    if (this.picture !== '' && this.roomDetails.value.room_category !== '' && this.roomDetails.value.price !== '' && this.roomDetails.value.numOf_available_rooms !== '') {
      this.noSpinnerShow = false
      let detailsObj = new FormData()
      detailsObj.append('roomPic', this.picture, this.picture.name)
      detailsObj.append('room_category', this.roomDetails.value.room_category)
      detailsObj.append('price', this.roomDetails.value.price)
      detailsObj.append('numOf_available_rooms', this.roomDetails.value.numOf_available_rooms)
      this.server.uploadRoomDetails(detailsObj).subscribe(response=>{
        if(response == 'Details Uploaded'){
          this.snackBar.open('Details of the room has been successfully updated', 'Undo', {duration: 3000})
          this.noSpinnerShow =true
        }
      });
    } else {
      this.snackBar.open('Please fill out all input fields', 'Undo', {duration: 3000})
    }
  }

  deleteDetails(details): any {
    details.type = 'deleteRoom';
    this.dialog.open(DialogComponent, { data: details, disableClose: true, width: '400px' });
  }

  preview(details): any{
    details.type = 'previewRoom';
    this.dialog.open(DialogComponent, { data: details, width: '350px' });
  }

}
