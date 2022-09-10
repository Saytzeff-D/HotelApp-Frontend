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
  constructor(public server: LaravelServerService) { }

  ngOnInit(): void {
    this.server.transHistory().subscribe(data=>{
      this.history = data
      this.isLoading = false
    })
  }

}
