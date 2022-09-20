import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.component.html',
  styleUrls: ['./verify-payment.component.css']
})
export class VerifyPaymentComponent implements OnInit {

  public noSpinnerShow = true;
  public dontShowWord = false;
  public payment_ref = '';
  public paymentDetails: any = [];
  public error = '';
  public refError = '';
  constructor(public server: LaravelServerService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  verify(){
    this.error = ''
    this.refError = ''
    this.paymentDetails = []
    this.noSpinnerShow = false
    this.dontShowWord = true
    if(this.payment_ref !== ''){
      let payObj = {paymentRef: this.payment_ref}
      this.server.verifyPayment(payObj).subscribe((data: any) => {
        if (data.length !== 0){
          if (data[0].room_status === 'Active'){
            this.noSpinnerShow = true;
            this.dontShowWord = false;
            this.paymentDetails = data;
          }else {
            this.noSpinnerShow = true;
            this.dontShowWord = false;
            this.refError = 'Sorry, this payment has expired...';
          }
        }
        else{
          console.log(data)
          this.noSpinnerShow = true;
          this.dontShowWord = false;
          this.snackBar.open('Payment not found', 'Back', {duration: 5000});
        }
      }, (err) => {
        this.noSpinnerShow = true;
        this.dontShowWord = false;
        this.error = 'Internal Server Error';
      });
    }
    else{
      this.noSpinnerShow = true
      this.dontShowWord = false
      this.snackBar.open('Please, Enter the Payment Reference', 'Back', {duration: 3000})
    }
  }
}
