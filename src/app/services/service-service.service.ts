import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {globalConstants} from "../globalConstants";
import {Service} from "../model/Service";

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {

  constructor(private http: HttpClient) { }

  baseURL = globalConstants.backendURL

  getServicesByCompany(id_company: Number){
    return this.http.get<Service[]>(this.baseURL + "/company/" + id_company + "/services", {observe: "response"})
  }

  addService(service: Service){
    let serviceData = new HttpParams();
    serviceData = serviceData.set("description", String(service.description))
    serviceData = serviceData.set("value", String(service.value))
    serviceData = serviceData.set("company", String(service.company.id))
    return this.http.post<Service>(this.baseURL + "/service", serviceData, {observe: "response"})
  }

  updateService(service: Service){
    let serviceData = new HttpParams();
    serviceData = serviceData.set("description", String(service.description))
    serviceData = serviceData.set("value", String(service.value))
    serviceData = serviceData.set("status", String(this.getNumberForStatus(service.status)))
    return this.http.put<Service>(this.baseURL + "/service/" + service.id, serviceData, {observe: "response"})
  }

  getQtddServicesClient(user_id: Number) {
    return this.http.get<Number>(this.baseURL + "/requests/user/" + String(user_id) + "/quantity", {observe: "response"})
  }

  getQtddServicesCompany(company_id: Number) {
    return this.http.get<Number>(this.baseURL + "/requests/company/" + String(company_id) + "/quantity", {observe: "response"})
  }

  private getNumberForStatus(status: String) {
    if(status == "ATIVO"){
      return "0"
    }else{
      return "1"
    }
  }
}
