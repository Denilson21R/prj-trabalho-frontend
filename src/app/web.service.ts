import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/User';
import {Animal} from "./model/Animal";
import {Schedule} from "./model/Schedule";
import {Service} from "./model/Service";
import {CompanyInvite} from "./model/CompanyInvite";
import {Company} from "./model/Company";
import {ServiceRequest} from "./model/ServiceRequest";

@Injectable({
  providedIn: 'root'
})

//TODO: divide in different services
export class WebService {

  baseURL = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getUserAnimals(id_user: Number){
    return this.http.get<Animal[]>(this.baseURL + "/user/" + String(id_user) + "/animals", {observe: "response"})
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

  updateCompanyInvite(status: Number, invite_id: Number){
    let statusInvite = new HttpParams();
    statusInvite = statusInvite.set("status", String(status));
    return this.http.patch<CompanyInvite[]>(this.baseURL + "/invite/" + invite_id, statusInvite, {observe: "response"})
  }



  getOpeningInvitesForCompany(company_id: Number){
    return this.http.get<CompanyInvite[]>(this.baseURL + "/invites/company/" + company_id, {observe: "response"})
  }

  getAllCompanies() {
    return this.http.get<Company[]>(this.baseURL + "/companies", {observe: "response"})
  }

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

  addSchedule(schedule: Schedule){
    let newSchedule = new HttpParams();
    newSchedule = newSchedule.set("animal", String(schedule.animal.id));
    newSchedule = newSchedule.set("date", String(schedule.date));
    newSchedule = newSchedule.set("amount", String(schedule.amount));
    newSchedule = newSchedule.set("company", String(schedule.company.id));
    newSchedule = newSchedule.set("employee_schedule", String(schedule.employee_schedule.id));
    newSchedule = newSchedule.set("services", String(this.convertArrayServicesToArrayOfStringId(schedule.service)));
    return this.http.post<Schedule>(this.baseURL + "/schedule", newSchedule, {observe: "response"})
  }

  addAnimal(animal: Animal){
    let newAnimal = new HttpParams();
    newAnimal = newAnimal.set("name", String(animal.name));
    newAnimal = newAnimal.set("description", String(animal.description));
    newAnimal = newAnimal.set("specie", String(animal.specie));
    newAnimal = newAnimal.set("owner", String(animal.owner.id));
    return this.http.post<Animal>(this.baseURL + "/animal", newAnimal, {observe: "response"})
  }

  updateAnimal(animal: Animal){
    let animalData = new HttpParams();
    animalData = animalData.set("name", String(animal.name));
    animalData = animalData.set("description", String(animal.description));
    animalData = animalData.set("status", String(this.getNumberForStatus(animal.status)));
    return this.http.put<Animal>(this.baseURL + "/animal/" + animal.id, animalData, {observe: "response"})
  }

  addCompany(company: Company) {
    let companyData = new HttpParams();
    companyData = companyData.set("name", String(company.company_name))
    companyData = companyData.set("email", String(company.email))
    companyData = companyData.set("user", String(company.user_create.id))
    if(company.cnpj){
      companyData = companyData.set("cnpj", String(company.cnpj))
    }
    return this.http.post<Company>(this.baseURL + "/company", companyData, {observe: "response"})
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

  updateSchedule(schedule: Schedule){
    let scheduleData = new HttpParams();
    scheduleData = scheduleData.set("paid", String(schedule.paid))
    scheduleData = scheduleData.set("status", String(this.changeScheduleStatusForBackend(schedule)))
    return this.http.put<Schedule>(this.baseURL + "/schedule/" + schedule.id, scheduleData, {observe: "response"})
  }

  getQtddSchedulesClient(user_id: Number) {
    return this.http.get<Number>(this.baseURL + "/schedules/user/" + String(user_id) + "/quantity", {observe: "response"})
  }

  getQtddSchedulesCompany(company_id: Number) {
    return this.http.get<Number>(this.baseURL + "/schedules/company/" + String(company_id) + "/quantity", {observe: "response"})
  }

  getQtddServicesClient(user_id: Number) {
    return this.http.get<Number>(this.baseURL + "/requests/user/" + String(user_id) + "/quantity", {observe: "response"})
  }

  getQtddServicesCompany(company_id: Number) {
    return this.http.get<Number>(this.baseURL + "/requests/company/" + String(company_id) + "/quantity", {observe: "response"})
  }

  updateCompany(company: Company) {
    let companyData = new HttpParams();
    if(company.cnpj){
      companyData = companyData.set("cnpj", String(company.cnpj))
    }
    companyData = companyData.set("name", String(company.company_name))
    companyData = companyData.set("email", String(company.email))
    return this.http.put<Company>(this.baseURL + "/company/" + company.id, companyData, {observe: "response"})
  }

  convertArrayServicesToArrayOfStringId(services: Service[]) {
    let serviceArrayId: String[] = []
    services.forEach((service)=>{
      serviceArrayId.push(String(service.id))
    })
    return serviceArrayId.join(", ")
  }

  private changeStatusForBackend(serviceRequest: ServiceRequest) {
    if (serviceRequest.status == "ACEITO") {
      serviceRequest.status = "1"
    } else { //RECUSADO
      serviceRequest.status = "2"
    }
  }

  private changeScheduleStatusForBackend(schedule: Schedule) {
    if (schedule.status == "NOVO") {
      return "0"
    } else if(schedule.status == "EXECUTANDO") {
      return "1"
    }else if(schedule.status == "FINALIZADO") {
      return "2"
    }else{ //CANCELADO
      return "3"
    }
  }

  private getNumberForStatus(status: String) {
    if(status == "ATIVO"){
      return "0"
    }else{
      return "1"
    }
  }

}
