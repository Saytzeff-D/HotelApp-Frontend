import { Component, OnInit } from '@angular/core';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  public history:any = []
  public isLoading = true
  public today = new Date().toLocaleDateString()
  constructor(public server: LaravelServerService) { }

  ngOnInit(): void {
    console.log(new Date('2022-09-13').toLocaleDateString(), new Date().toLocaleDateString())
    this.server.transHistory().subscribe(data=>{
      this.history = data
      this.isLoading = false
    })
  }

}
