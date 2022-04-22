import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaystackOptions } from 'angular4-paystack';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public bookingInfo:any = {}
  public roomDetails:any = {}
  public dontShowLoading = false
  public dontShowPage = true
  public amountPayable:any = ''
  constructor(public server: LaravelServerService, public router: Router) {
    this.bookingInfo = JSON.parse(sessionStorage.getItem('roomInfo'))
   }
   options: PaystackOptions = {
     amount: this.amountPayable,
     email: '',
     ref: `${Math.ceil(Math.random() * 10e10)}`
   }

  ngOnInit(): void {
    sessionStorage.removeItem('route')
    if (sessionStorage.getItem('roomInfo')) {
      let obj = {roomCategory: this.bookingInfo.roomCategory}
    console.log(obj)
    this.server.getRoomPrice(obj).subscribe((res:any)=>{
      console.log(res)
      this.roomDetails = res.roomDetails
      this.options.email = res.email
      this.amountPayable = parseInt(this.roomDetails.price) * parseInt(this.bookingInfo.numOfNights) *parseInt(this.bookingInfo.numOfRooms)
      this.options.amount = parseInt(JSON.stringify(parseInt(this.roomDetails.price) * parseInt(this.bookingInfo.numOfNights) *parseInt(this.bookingInfo.numOfRooms)) + '0' + '0')
      this.dontShowLoading = true
      this.dontShowPage = false
    }, error=>{
      if (error.error.message == 'Token has expired' || error.error.message == 'Wrong number of segments' || error.error.message == 'The token has been blacklisted') {
        sessionStorage.setItem('route', 'Book-Room')
        sessionStorage.setItem('infoMsg', 'Please Login to continue')
        this.router.navigate(['login'])
      }
    })
    } else {
      this.router.navigate(['book-room'])
    }
  }

  paymentInit(){
    console.log('Payment Initialized')
  }
  paymentDone(ref: any){
    this.bookingInfo.amount = this.amountPayable
    this.bookingInfo.payment_ref = ref.trxref
    this.bookingInfo.payment_status = 'Payment Successful'
    console.log(this.bookingInfo)
    this.server.payNow(this.bookingInfo).subscribe(res=>{
      if(res == 'Inserted'){
        this.router.navigate(['user/trans-history'])
      }
    })
  }
  paymentCancel(){
    this.bookingInfo.amount = this.amountPayable
    this.bookingInfo.payment_ref = this.options.ref
    console.log(this.bookingInfo)
    this.server.payNow(this.bookingInfo).subscribe(res=>{
      if(res == 'Inserted'){
        this.router.navigate(['user/trans-history'])
      }
    })
  }
  cancel(){
    sessionStorage.removeItem('roomInfo')
    this.router.navigate(['user/dashboard'])
  }

}
