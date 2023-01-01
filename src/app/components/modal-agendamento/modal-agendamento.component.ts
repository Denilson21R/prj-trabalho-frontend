import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Company} from "../../model/Company";
import {Animal} from "../../model/Animal";
import {User} from "../../model/User";
import {Service} from "../../model/Service";
import {NgForm} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {ServiceRequest} from "../../model/ServiceRequest";
import {ToastrService} from "ngx-toastr";
import {AnimalServiceService} from "../../services/animal-service.service";
import {ServiceServiceService} from "../../services/service-service.service";
import {CompanyServiceService} from "../../services/company-service.service";
import {ServiceRequestServiceService} from "../../services/service-request-service.service";

@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.css']
})
export class ModalAgendamentoComponent implements OnInit {

  @Input() user!: User
  companySelected!: Company
  animalSelected!: Animal
  @ViewChild("btnCancelar") btnCancelar!: ElementRef<HTMLElement>

  companies?: Company[]
  animals: Animal[] = []
  services?: Service[]
  servicesSelected: String[] = [];
  date!: Date;
  totalValue?: number
  dateToday: string = new Date().toISOString().slice(0, 16);

  constructor(
    private animalWeb: AnimalServiceService,
    private serviceWeb: ServiceServiceService,
    private companyWeb: CompanyServiceService,
    private serviceRequestWeb: ServiceRequestServiceService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  private getInitialData() {
    this.companyWeb.getAllCompanies().subscribe((res) => {
      if (res.ok) {
        this.companies = res.body!
      }
      this.animalWeb.getUserAnimals(this.user.id!).subscribe((response)=>{
        if(response.ok){
          response.body!.forEach((animal)=>{
            if(animal.status == "ATIVO"){
              this.animals?.push(animal)
            }
          })
        }
      })
    })
  }

  getServicesByCompany() {
    this.services = []
    this.serviceWeb.getServicesByCompany(Number(this.companySelected)).subscribe((res)=>{
      if(res.ok){
        res.body!.forEach((service)=>{
          if (service.status == "ATIVO"){
            this.services?.push(service)
          }
        })
      }
    })
  }

  saveSchedule(scheduleForm: NgForm) {
    if(this.animalSelected && scheduleForm.value.companies && scheduleForm.value.date && this.servicesSelected.length > 0){
      let finalServicesArray : String[]  = []
      this.fillServicesArray(finalServicesArray);
      this.addScheduleRequest(scheduleForm, finalServicesArray);
    }
  }

  private addScheduleRequest(scheduleForm: NgForm, finalServicesArray: String[]) {
    this.serviceRequestWeb.addScheduleRequest(Number(this.animalSelected), scheduleForm.value.companies, this.user.id!, scheduleForm.value.date).subscribe((res) => {
      if (res.ok && res.body?.id) {
        this.fillServicesOfServiceRequest(finalServicesArray, res);
      }else{
        this.toast.error('Ocorreu um erro ao salvar o pedido!')
      }
    })
  }

  private fillServicesArray(finalServicesArray: String[]) {
    this.services?.forEach((service, index) => {
      if (this.servicesSelected[index]) {
        finalServicesArray.push(String(service.id!))
      }
    })
  }

  private fillServicesOfServiceRequest(finalServicesArray: String[], res: HttpResponse<ServiceRequest>) {
    this.serviceRequestWeb.setServicesOfServiceRequest(finalServicesArray, res.body?.id!).subscribe((res) => {
      if (res.ok) {
        this.toast.success('Pedido salvo com sucesso!')
      } else {
        this.toast.error('Ocorreu um erro salvar os serviços do pedido!')
      }
      this.btnCancelar.nativeElement.click()
    })
  }

  calculateTotalValue() {
    this.totalValue = 0
    if(this.servicesSelected.length > 0){
      this.services?.forEach((service, index) => {
        if (this.servicesSelected[index]) {
          this.totalValue = this.totalValue! + service.value
        }
      })
    }
  }
}
