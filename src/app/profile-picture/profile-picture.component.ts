import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  public isUploading = false

  constructor(
    @Inject (MAT_DIALOG_DATA) public dialogData: any,
    public server: LaravelServerService,
    public snackBarRef: MatSnackBar,
    public dialogRef: MatDialogRef<ProfilePictureComponent>
  ) { }

  ngOnInit(): void {
  }
  takePic(): any{
    document.getElementById('userPic').click();
  }
  uploadPic(event): any{
    this.isUploading = true;
    const pic = event.target.files[0];
    const myFileData = new FormData();
    myFileData.append('userPic', pic, pic.name);
    this.server.uploadUserPic(myFileData).subscribe(res => {
      if (res === 'Updated'){
        this.dialogRef.close('Updated');
      }else{
        this.snackBarRef.open('Internal Server Error', 'Dismiss');
        this.isUploading = false;
      }
    }, err => {
      console.log(err)
      this.snackBarRef.open('Unable to process your request', 'Dismiss');
      this.isUploading = false;
    });
  }
  onCancel(): any {
    this.dialogRef.close();
  }

}
