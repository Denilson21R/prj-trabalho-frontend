import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  baseURL = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  signUpUser(user: any): Observable<any>{
    let newUser = new HttpParams();
    newUser = newUser.set("name", String(user.name));
    newUser = newUser.set("phone", String(user.phone));
    newUser = newUser.set("email", String(user.email));
    newUser = newUser.set("password", String(user.password));
    newUser = newUser.set("type", Number(user.type));
    return this.http.post(this.baseURL + "/user", newUser, {observe: "response"});
  }

  signInUser(user: any): Observable<any>{
    let userAuthenticate = new HttpParams();
    userAuthenticate = userAuthenticate.set("email", String(user.email));
    userAuthenticate = userAuthenticate.set("password", String(user.password));
    return this.http.post(this.baseURL + "/user/authenticate", userAuthenticate, {observe: "response"});
  }
}
