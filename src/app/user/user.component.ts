import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import { LaravelServerService } from '../services/laravel-server.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  mobileQuery: MediaQueryList;
  panelOpenState = false;

  private _mobileQueryListener: () => void;
  public user:any = {}
  constructor(public server: LaravelServerService, public router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialogRef: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  opened: boolean

  ngOnInit(): void {
    this.server.fetchUser().subscribe((data:any)=>{
        this.user = data
        this.server.user.next(data)
    }, error=>{
      if(error.error.message == 'Token has expired' || error.error.message == 'The token has been blacklisted' || error.error.message == 'Wrong number of segments'){
        sessionStorage.setItem('errorMsg', 'You have to login first!')
        this.router.navigate(['login'])
      }
    })
  }
  logOut(){
    this.dialogRef.open(DialogComponent)
  }

}

