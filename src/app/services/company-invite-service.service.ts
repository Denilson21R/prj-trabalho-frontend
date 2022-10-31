import { Injectable } from '@angular/core';
import {CompanyInvite} from "../model/CompanyInvite";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompanyInviteServiceService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:8080"

  getOpeningInvitesForUser(user_id: Number){
    return this.http.get<CompanyInvite[]>(this.baseURL + "/invites/user/" + user_id, {observe: "response"})
  }
}
