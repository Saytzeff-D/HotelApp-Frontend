import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public loggingOut = false

  constructor(
    @Inject (MAT_DIALOG_DATA) public dialogData: any,
     public dialogRef: MatDialogRef<DialogComponent>,
     public server: LaravelServerService,
     public router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.dialogData)
  }
  onNoClick(){
    this.dialogRef.close()
  }
  onYesClick(){
    this.loggingOut = true
    localStorage.removeItem('JWT')
    this.server.logout().subscribe((res:any)=>{
      if(res.message == 'Successfully logged out'){
        this.dialogRef.close()
        sessionStorage.setItem('successMsg', 'Successfully logged out')
        this.router.navigate(['login'])
      }
    })
  }

}
