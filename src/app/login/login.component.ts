import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../register/register.component';
import { LaravelServerService } from '../services/laravel-server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public noSpinnerShow = true
  public dontShowWord = false
  public success = ''
  public error = ''
  public info = ''
  public backEndRes:any = {}
  constructor(public server: LaravelServerService, public router: Router) { }
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.min(10), Validators.required])
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.success = sessionStorage.getItem('successMsg')
    sessionStorage.removeItem('successMsg')
    this.error = sessionStorage.getItem('errorMsg')
    sessionStorage.removeItem('errorMsg')
    this.info = sessionStorage.getItem('infoMsg')
    sessionStorage.removeItem('infoMsg')
  }

  login(){
    this.success = null
    this.error = null
    let initalRoute = sessionStorage.getItem('route')
    if (this.email.value && this.password.value !== '') {
      this.noSpinnerShow = false
      this.dontShowWord = true
      let obj = {email: this.email.value, password: this.password.value}
      this.server.loginUser(obj).subscribe(response=>{
        this.backEndRes = response
        this.noSpinnerShow = true
          this.dontShowWord = false
        if(this.backEndRes.error){
          this.success = null
          this.error = 'Invalid Login'
        }
        else{
          localStorage.setItem('JWT', this.backEndRes.access_token)
          this.server.auth_token.next(localStorage.getItem('JWT'))
          if(initalRoute == 'Book-Room'){
            this.router.navigate(['payNow'])
          }
          else{
            this.router.navigate(['user'])
          }
        }
      }, error=>{
        // console.log(error.message)
        this.noSpinnerShow = true
        this.dontShowWord = false
        this.success = null
        this.error = error.message
      })
    } else { }
  }
  dismissAlert(){
    this.success = null
    this.error = null
    this.info = null
  }

}
