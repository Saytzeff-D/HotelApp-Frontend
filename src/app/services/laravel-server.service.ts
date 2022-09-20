import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaravelServerService {

  public baseUrl = 'http://localhost:8000/api/'
  public user = new BehaviorSubject({})
  public auth_token = new BehaviorSubject('')
  constructor(public http: HttpClient) { }

  registerUser(obj){
    return this.http.post(`${this.baseUrl}register`, obj)
  }
  loginUser(loginForm){
    return this.http.post(`${this.baseUrl}login`, loginForm)
  }
  setBanner(obj){
    return this.http.post(`${this.baseUrl}setBanner`, obj)
  }
  getMethod(route){
    return this.http.get(`${this.baseUrl + route}`)
  }
  uploadRoomDetails(details){
    return this.http.post(`${this.baseUrl}uploadDetails`, details)
  }
  fetchUser(){
    return this.http.post(`${this.baseUrl}me`, 'User')
  }
  token(){
    return localStorage.getItem('JWT');
  }
  uploadUserPic(file){
    return this.http.post(`${this.baseUrl}editProfile`, file)
  }
  updateUserProfile(obj){
    return this.http.post(`${this.baseUrl}editProfile`, obj)
  }
  checkAvailableRoom(roomInfo){
    return this.http.post(`${this.baseUrl}checkRoom`, roomInfo)
  }
  getRoomPrice(roomCategory){
    return this.http.post(`${this.baseUrl}getRoomPrice`, roomCategory)
  }
  logout(){
    return this.http.post(`${this.baseUrl}logout`, 'Logout')
  }
  payNow(payInfo){
    return this.http.post(`${this.baseUrl}pay`, payInfo)
  }
  transHistory(){
    return this.http.get(`${this.baseUrl}transHistory`);
  }
  allBookings(){
    return this.http.get(`${this.baseUrl}allBookings`);
  }
  myVisits(): any{
    return this.http.get(`${this.baseUrl}myVists`);
  }
  verifyPayment(obj): any{
    return this.http.post(`${this.baseUrl}verifyPay`, obj);
  }
  checkOut(booking): any{
    return this.http.patch(`${this.baseUrl}checkOut`, booking);
  }
}
