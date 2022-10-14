import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/User';
import {Animal} from "./model/Animal";
import {Permission} from "./model/Permission";
import {Schedule} from "./model/Schedule";
import {Service} from "./model/Service";
import {CompanyInvite} from "./model/CompanyInvite";
import {Company} from "./model/Company";

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

  getUserAnimals(id_user: Number){
    return this.http.get<Animal[]>(this.baseURL + "/user/" + String(id_user) + "/animals")
  }

  updateUser(user: User) {
    let userAuthenticate = new HttpParams();
    userAuthenticate = userAuthenticate.set("name", String(user.name));
    userAuthenticate = userAuthenticate.set("email", String(user.email));
    userAuthenticate = userAuthenticate.set("phone", String(user.phone));
    return this.http.put(this.baseURL + "/user/" + user.id!, userAuthenticate, {observe: "response"})
  }

  getUserPermissions(id_user: Number){
    return this.http.get<Permission>(this.baseURL + "/permission/" + String(id_user), {observe: "response"})
  }

  getSchedulesByCompany(id_company: Number){
    return this.http.get<Schedule[]>(this.baseURL + "/company/" + String(id_company) + "/schedules", {observe: "response"})
  }

  getSchedulesByClientAnimals(id_client: Number){
    return this.http.get<Schedule[]>(this.baseURL + "/schedules/client/" + String(id_client), {observe: "response"})
  }

  getServicesByCompany(id_company: Number){
    return this.http.get<Service[]>(this.baseURL + "/company/" + id_company + "/services", {observe: "response"})
  }

  getEmployeesByCompany(id_company: Number){
    return this.http.get<User[]>(this.baseURL + "/company/" + id_company + "/users", {observe: "response"})
  }

  addInviteToUserByEmail(email: String, company: Number){
    let userInvited = new HttpParams();
    userInvited = userInvited.set("email", String(email));
    userInvited = userInvited.set("company", String(company));
    return this.http.post<CompanyInvite>(this.baseURL + "/invite", userInvited, {observe: "response"})
  }

  getOpeningInvitesForUser(user_id: Number){
    return this.http.get<CompanyInvite[]>(this.baseURL + "/invites/user/" + user_id, {observe: "response"})
  }

  updateCompanyInvite(status: Number, invite_id: Number){
    let statusInvite = new HttpParams();
    statusInvite = statusInvite.set("status", String(status));
    return this.http.patch<CompanyInvite[]>(this.baseURL + "/invite/" + invite_id, statusInvite, {observe: "response"})
  }

  addPermission(permission: Permission) {
    let newPermission = new HttpParams();
    newPermission = newPermission.set("company", String(permission.company.id))
    newPermission = newPermission.set("company_owner", String(permission.company_owner))
    newPermission = newPermission.set("can_add_schedules", String(permission.can_add_schedules))
    newPermission = newPermission.set("can_add_services", String(permission.can_add_services))
    newPermission = newPermission.set("user", String(permission.user.id))
    return this.http.post<Permission>(this.baseURL + "/permission", newPermission, {observe: "response"})
  }

  getOpeningInvitesForCompany(company_id: Number){
    return this.http.get<CompanyInvite[]>(this.baseURL + "/invites/company/" + company_id, {observe: "response"})
  }

  updatePermission(permission: Permission) {
    let permissionData = new HttpParams();
    permissionData = permissionData.set("services", String(permission.can_add_services));
    permissionData = permissionData.set("schedules", String(permission.can_add_schedules));
    return this.http.patch<Permission>(this.baseURL + "/permission/" + permission.id, permissionData, {observe: "response"})
  }
}
