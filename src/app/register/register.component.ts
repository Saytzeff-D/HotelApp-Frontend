import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm,Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LaravelServerService } from '../services/laravel-server.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerInfo = {}

  public noSpinnerShow = true
  public dontShowWord = false
  constructor(public server: LaravelServerService, public router: Router) { }
     email = new FormControl('', [Validators.required, Validators.email])
     password = new FormControl('', [Validators.min(5), Validators.required])
     confPassword = new FormControl('', [Validators.min(5), Validators.required])
     firstName = new FormControl('', [Validators.required])
     lastName = new FormControl('', [Validators.required])
     mobileNumber = new FormControl('', [Validators.required, Validators.pattern("^((\\+234-?)|0)?[0-9]{10}$")])
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

  register(){
    let initalRoute = sessionStorage.getItem('route')
    let msg = (initalRoute == 'Book-Room')?'Login to continue with your bookings':'Login Here! We need to verify that it is you'
    if(this.email.value && this.password.value && this.confPassword.value && this.firstName.value && this.lastName.value && this.mobileNumber.value !== ''){
      this.noSpinnerShow = false
      this.dontShowWord = true
    this.registerInfo = {email: this.email.value, password: this.password.value, firstName: this.firstName.value, lastName: this.lastName.value, mobileNumber: this.mobileNumber.value}
    console.log(this.registerInfo)
    this.server.registerUser(this.registerInfo).subscribe(res=>{
      if (res == 'User Created') {
        sessionStorage.setItem('successMsg', msg)
        this.router.navigate(['login'])
      } else {
        this.noSpinnerShow = true
        this.dontShowWord = false
        console.log(res)
        alert('Unable to process your request')
      }
    })
    }
    else{ }
  }
}
