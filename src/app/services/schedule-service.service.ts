import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {globalConstants} from "../globalConstants";
import {Schedule} from "../model/Schedule";
import {Service} from "../model/Service";

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {

  constructor(private http: HttpClient) { }

  baseURL = globalConstants.backendURL

  getSchedulesByCompany(id_company: Number){
    return this.http.get<Schedule[]>(this.baseURL + "/company/" + String(id_company) + "/schedules", {observe: "response"})
  }

  getSchedulesByClientAnimals(id_client: Number){
    return this.http.get<Schedule[]>(this.baseURL + "/schedules/client/" + String(id_client), {observe: "response"})
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

  convertArrayServicesToArrayOfStringId(services: Service[]) {
    let serviceArrayId: String[] = []
    services.forEach((service)=>{
      serviceArrayId.push(String(service.id))
    })
    return serviceArrayId.join(", ")
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
}
