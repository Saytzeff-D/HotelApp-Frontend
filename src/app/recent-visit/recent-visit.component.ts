import { Component, OnInit } from '@angular/core';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-recent-visit',
  templateUrl: './recent-visit.component.html',
  styleUrls: ['./recent-visit.component.css']
})
export class RecentVisitComponent implements OnInit {

  public filterVisit;
  public visits:any = []
  constructor(public server: LaravelServerService) { }

  ngOnInit(): void {
    this.server.myVisits().subscribe(data=>{
      this.visits = data
    })
  }

}
