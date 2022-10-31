import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {globalConstants} from "../globalConstants";
import {Company} from "../model/Company";

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private http: HttpClient) { }

  baseURL = globalConstants.backendURL

  getAllCompanies() {
    return this.http.get<Company[]>(this.baseURL + "/companies", {observe: "response"})
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

  updateCompany(company: Company) {
    let companyData = new HttpParams();
    if(company.cnpj){
      companyData = companyData.set("cnpj", String(company.cnpj))
    }
    companyData = companyData.set("name", String(company.company_name))
    companyData = companyData.set("email", String(company.email))
    return this.http.put<Company>(this.baseURL + "/company/" + company.id, companyData, {observe: "response"})
  }
}
