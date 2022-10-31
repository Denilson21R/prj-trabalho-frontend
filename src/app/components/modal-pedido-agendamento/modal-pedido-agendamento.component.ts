import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ServiceRequest} from "../../model/ServiceRequest";
import {Schedule} from "../../model/Schedule";
import {User} from "../../model/User";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ServiceRequestServiceService} from "../../services/service-request-service.service";
import {ScheduleServiceService} from "../../services/schedule-service.service";

@Component({
  selector: 'app-modal-pedido-agendamento',
  templateUrl: './modal-pedido-agendamento.component.html',
  styleUrls: ['./modal-pedido-agendamento.component.css']
})
export class ModalPedidoAgendamentoComponent implements OnInit {
  @Input() requestSelected?: ServiceRequest
  totalValue: number = 0;
  user: User = new User()

  constructor(
    private serviceRequestWeb: ServiceRequestServiceService,
    private scheduleWeb: ScheduleServiceService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.user.type = sessionStorage.getItem('user.type')!
  }

  ngOnChanges(changes: SimpleChanges){
    this.calcTotalValue(changes);
  }

  private calcTotalValue(changes: SimpleChanges) {
    if (changes['requestSelected'].currentValue) {
      this.requestSelected?.requested_services.forEach((service) => {
        this.totalValue += service.value
      })
    }
  }

  changeServiceRequest(status: number) {
    if(status == 1){
      this.requestSelected!.status = "ACEITO"
      this.updateServiceRequest();
    }else if(status == 2){
      //index of enum is sent to backend
      this.requestSelected!.status = "RECUSADO"
      this.updateServiceRequest();
    }else{
      this.toast.error('Ocorreu um erro ao atualizar o pedido!')
    }
  }

  private updateServiceRequest() {
    this.serviceRequestWeb.updateServiceRequest(this.requestSelected!).subscribe((res) => {
      if (res.ok) {
        this.requestSelected!.status = res.body!.status!
        if(res.body?.status == "ACEITO"){
          let schedule: Schedule = new Schedule()
          this.fillSchedule(schedule, res);
          this.scheduleWeb.addSchedule(schedule).subscribe((response)=>{
            if(response.ok){
              this.toast.success('Agendamento criado com sucesso!')
            }else{
              this.toast.error('Ocorreu um erro ao criar o agendamento!')
            }
          })
        }else if(res.body?.status == "NEGADO"){
          this.toast.success('Agendamento recusado com sucesso!')
        }
      }else{
        this.toast.error('Ocorreu um erro durante a atualização do pedido!')
      }
    })
  }

  private fillSchedule(schedule: Schedule, res: HttpResponse<ServiceRequest>) {
    schedule.service = res.body!.requested_services
    schedule.company = res.body!.company
    schedule.date = res.body!.serviceDate
    schedule.amount = this.totalValue
    let employeeExec = new User();
    if (sessionStorage.getItem('user.id') != null) {
      employeeExec.id = Number(sessionStorage.getItem('user.id')!)
    }
    schedule.employee_schedule = employeeExec
    schedule.animal = res.body!.animal
  }
}
