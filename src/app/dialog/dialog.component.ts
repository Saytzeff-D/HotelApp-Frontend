import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public loggingOut = false;
  public isLoading = false;

  constructor(
    @Inject (MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    public server: LaravelServerService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // console.log(this.dialogData)
  }
  onNoClick(): any{
    this.dialogRef.close();
  }
  onYesClick(): any{
    this.loggingOut = true
    localStorage.removeItem('JWT')
    this.server.logout().subscribe((res:any)=>{
      if(res.message == 'Successfully logged out'){
        this.dialogRef.close()
        sessionStorage.setItem('successMsg', 'Successfully logged out')
        this.router.navigate(['login']);
      }
    });
  }

  onYesCheckOut(): any {
    this.isLoading = true;
    const obj = { id: this.dialogData.booked_room_id };
    this.server.checkOut(obj).subscribe(res => {
      if (res === 'Success'){
        this.dialogRef.close('Check Out');
      }else {
        this.snackBar.open('An error has occured', 'Dismiss');
        this.isLoading = false;
      }
    }, err => {
      this.isLoading = false;
      this.snackBar.open('Internal Server Error', 'Dismiss');
    });
  }

  deleteBanner(): any {
    this.isLoading = true;
    const obj = { id: this.dialogData.banner_id };
    this.server.deleteBanner(obj).subscribe((res) => {
      this.dialogRef.close(res);
      this.snackBar.open('Banner deleted successfully', 'Dismiss');
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

  deleteRoom(): any {
    this.isLoading = true;
    const obj = { id: this.dialogData.details_id };
    this.server.deleteRoom(obj).subscribe((res) => {
      this.dialogRef.close(res);
      this.snackBar.open('Details deleted successfully', 'Dismiss');
    }, (err) => {
      console.log(err);
      this.isLoading = false;
    });
  }

}
