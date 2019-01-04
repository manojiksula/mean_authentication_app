import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri: string = "http://localhost:4000";
  token: string;
  user: any;
  constructor(
    private http: HttpClient
  ) { }

  //Get DashBoard...........................
  getDashBoard() {
    this.onLoadUserData();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.get(`${this.uri}/user/dashboard`, { headers: headers });
  }

  //Register User.............................
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.uri}/user/register`, user, { headers: headers });
  }

  //Authenticate User..........................
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.uri}/user/authenticate`, user, { headers: headers });
  }

  //Store Token & User on Local Storage.......................
  storeUserData(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('access_token', token);
    localStorage.setItem('access_user', JSON.stringify(user));
  }

  //Logout User.........................
  logOutUser() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  //Get Token & User Back from Local Storage................
  onLoadUserData() {
    this.token = localStorage.getItem('access_token');
  }

  //Verify Token
  isLoggedIn() {
    return (localStorage.getItem('access_token') !== null);
  }
}
