import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile:any = {}
  constructor(public server: LaravelServerService, public snackBarRef: MatSnackBar) { }

  ngOnInit(): void {
    this.server.user.subscribe(obj=>{
      this.profile = obj
    })
  }
  takePic(){
    document.getElementById('userPic').click()
  }
  uploadPic(event){
    let pic = event.target.files[0]
    let myFileData = new FormData()
    myFileData.append('userPic', pic, pic.name)
    this.server.uploadUserPic(myFileData).subscribe(res=>{
      if(res == 'Updated'){
        console.log('Me')
      }
    })
  }
  editProfile(){
    let userObj = {me: '56'}
    this.server.updateUserProfile(userObj).subscribe((res:any)=>{
      this.snackBarRef.open(res, 'Undo', {duration: 3000})
    })
  }

}
