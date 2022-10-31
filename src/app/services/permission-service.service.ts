import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Permission} from "../model/Permission";
import {globalConstants} from "../globalConstants";

@Injectable({
  providedIn: 'root'
})
export class PermissionServiceService {

  baseURL = globalConstants.backendURL

  constructor(private http: HttpClient) { }

  getUserPermissions(id_user: Number){
    return this.http.get<Permission>(this.baseURL + "/permission/" + String(id_user), {observe: "response"})
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

  updatePermission(permission: Permission) {
    let permissionData = new HttpParams();
    permissionData = permissionData.set("services", String(permission.can_add_services));
    permissionData = permissionData.set("schedules", String(permission.can_add_schedules));
    return this.http.patch<Permission>(this.baseURL + "/permission/" + permission.id, permissionData, {observe: "response"})
  }
}
