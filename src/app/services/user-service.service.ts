import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {globalConstants} from "../globalConstants";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseURL = globalConstants.backendURL

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

  signInUser(user: any){
    let userAuthenticate = new HttpParams();
    userAuthenticate = userAuthenticate.set("email", String(user.email));
    userAuthenticate = userAuthenticate.set("password", String(user.password));
    return this.http.post(this.baseURL + "/user/authenticate", userAuthenticate, {observe: "response"});
  }

  updateUser(user: User) {
    let userAuthenticate = new HttpParams();
    userAuthenticate = userAuthenticate.set("name", String(user.name));
    userAuthenticate = userAuthenticate.set("email", String(user.email));
    userAuthenticate = userAuthenticate.set("phone", String(user.phone));
    if(user.password != null){
      userAuthenticate = userAuthenticate.set("password", String(user.password));
    }
    return this.http.put(this.baseURL + "/user/" + user.id!, userAuthenticate, {observe: "response"})
  }

  getEmployeesByCompany(id_company: Number){
    return this.http.get<User[]>(this.baseURL + "/company/" + id_company + "/users", {observe: "response"})
  }
}
