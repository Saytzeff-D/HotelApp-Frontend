import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public imgArr:any = []
  constructor(public server: LaravelServerService, public router: Router) { }

  ngOnInit(): void {
    this.server.getMethod('getBanner').subscribe(banners=>{
      this.imgArr = banners
      console.log(banners)
    })
  }
  book(){
    this.router.navigate(['book-room']);
  }

}
