import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {globalConstants} from "../globalConstants";
import {ServiceRequest} from "../model/ServiceRequest";

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestServiceService {

  constructor(private http: HttpClient) { }

  baseURL = globalConstants.backendURL

  addScheduleRequest(animal_id: Number, company_id: Number, user_id: Number, date: Date){
    let requestData = new HttpParams();
    requestData = requestData.set("animal", String(animal_id));
    requestData = requestData.set("company", String(company_id));
    requestData = requestData.set("user", String(user_id));
    requestData = requestData.set("date", String(date));
    return this.http.post<ServiceRequest>(this.baseURL + "/service-request", requestData, {observe: "response"})
  }

  setServicesOfServiceRequest(services: String[], service_request_id: Number){
    let serviceList = new HttpParams();
    serviceList = serviceList.set("services", services.join(", "));
    return this.http.patch<ServiceRequest>(this.baseURL + "/service-request/"+ String(service_request_id) +"/services", serviceList, {observe: "response"})
  }

  getServiceRequestsByCompany(company_id: Number) {
    return this.http.get<ServiceRequest[]>(this.baseURL + "/requests/company/" + String(company_id), {observe: "response"})
  }

  getServiceRequestsByUser(user_id: Number) {
    return this.http.get<ServiceRequest[]>(this.baseURL + "/requests/user/" + String(user_id), {observe: "response"})
  }

  updateServiceRequest(serviceRequest: ServiceRequest){
    this.changeStatusForBackend(serviceRequest);
    let newRequest = new HttpParams();
    newRequest = newRequest.set("animal", String(serviceRequest.animal.id));
    newRequest = newRequest.set("status", String(serviceRequest.status));
    newRequest = newRequest.set("date", String(serviceRequest.serviceDate));
    return this.http.put<ServiceRequest>(this.baseURL + "/service-request/" + String(serviceRequest.id), newRequest, {observe: "response"})
  }

  private changeStatusForBackend(serviceRequest: ServiceRequest) {
    if (serviceRequest.status == "ACEITO") {
      serviceRequest.status = "1"
    } else { //RECUSADO
      serviceRequest.status = "2"
    }
  }
}
