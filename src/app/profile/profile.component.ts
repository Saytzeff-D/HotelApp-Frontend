import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaravelServerService } from '../services/laravel-server.service';

export interface DialogData {
  picture: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: any = {};
  public isUploading = false;
  constructor(
    public server: LaravelServerService,
    public snackBarRef: MatSnackBar,
    public dialogRef: MatDialogRef<ProfileComponent>
  ) { }

  ngOnInit(): void {
    this.server.user.subscribe(obj => {
      this.profile = obj;
    });
  }
  editProfile(): any{
    const userObj = {me: '56'};
    this.server.updateUserProfile(userObj).subscribe((res: any) => {
      this.snackBarRef.open(res, 'Undo', {duration: 3000});
    });
  }
  onCancel(): any {
    this.dialogRef.close();
  }

}
