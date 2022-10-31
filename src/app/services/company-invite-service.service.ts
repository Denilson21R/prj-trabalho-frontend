import { Injectable } from '@angular/core';
import {CompanyInvite} from "../model/CompanyInvite";
import {HttpClient, HttpParams} from "@angular/common/http";
import {globalConstants} from "../globalConstants";

@Injectable({
  providedIn: 'root'
})
export class CompanyInviteServiceService {

  constructor(private http: HttpClient) { }

  baseURL = globalConstants.backendURL

  getOpeningInvitesForUser(user_id: Number){
    return this.http.get<CompanyInvite[]>(this.baseURL + "/invites/user/" + user_id, {observe: "response"})
  }

  addInviteToUserByEmail(email: String, company: Number){
    let userInvited = new HttpParams();
    userInvited = userInvited.set("email", String(email));
    userInvited = userInvited.set("company", String(company));
    return this.http.post<CompanyInvite>(this.baseURL + "/invite", userInvited, {observe: "response"})
  }

  updateCompanyInvite(status: Number, invite_id: Number){
    let statusInvite = new HttpParams();
    statusInvite = statusInvite.set("status", String(status));
    return this.http.patch<CompanyInvite[]>(this.baseURL + "/invite/" + invite_id, statusInvite, {observe: "response"})
  }

  getOpeningInvitesForCompany(company_id: Number){
    return this.http.get<CompanyInvite[]>(this.baseURL + "/invites/company/" + company_id, {observe: "response"})
  }
}
