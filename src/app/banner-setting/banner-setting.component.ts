import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LaravelServerService } from '../services/laravel-server.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-banner-setting',
  templateUrl: './banner-setting.component.html',
  styleUrls: ['./banner-setting.component.css']
})
export class BannerSettingComponent implements OnInit {

  public file;
  public caption = new FormControl('');
  public subCaption = new FormControl('');
  public noSpinnerShow = true;
  public response: any = {};
  public bannerFiles: any = [];
  public isLoading = true;
  public isDeleting = { index: '' };
  constructor(
    public server: LaravelServerService, 
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.server.getMethod('getBanner').subscribe(banner=>{
      this.bannerFiles = banner
      this.isLoading = false
    })
  }
  getTheBanner(event){
    this.file = event.target.files[0]
  }
  setTheBanner(){
    console.log(this.file, this.caption.value, this.subCaption.value)
    if(this.file !== '' && this.caption.value !== '' && this.subCaption.value !== ''){
      this.noSpinnerShow = false
      let myObj = new FormData()
    myObj.append('banner', this.file, this.file.name)
    myObj.append('caption', this.caption.value)
    myObj.append('subCaption', this.subCaption.value)
    this.server.setBanner(myObj).subscribe(res=>{
      this.response = res
      if(res == 'Updated'){
        this.snackBar.open('Banner Records Updated', 'Undo', {duration: 3000})
        this.noSpinnerShow = true
      }
      else{
        this.snackBar.open(this.response.message, 'Undo', {duration: 3000})
        this.noSpinnerShow = true
      }
    })
    }
    else{
      this.snackBar.open('All fields are required', 'Redo', {duration: 3000})
    }
  }
  deleteBanner(banner, i): any{
    banner.type = 'deleteBanner';
    this.dialog.open(DialogComponent, { data: banner, disableClose: true, width: '350px' });
  }

  preview(banner): any {
    banner.type = 'previewBanner';
    this.dialog.open(DialogComponent, { data: banner, width: '350px' });
  }

}
