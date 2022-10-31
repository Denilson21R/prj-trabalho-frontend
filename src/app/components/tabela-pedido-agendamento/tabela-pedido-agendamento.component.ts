import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/User";
import {Permission} from "../../model/Permission";
import {ServiceRequest} from "../../model/ServiceRequest";
import {ToastrService} from "ngx-toastr";
import {ServiceRequestServiceService} from "../../services/service-request-service.service";

@Component({
  selector: 'app-tabela-pedido-agendamento',
  templateUrl: './tabela-pedido-agendamento.component.html',
  styleUrls: ['./tabela-pedido-agendamento.component.css']
})
export class TabelaPedidoAgendamentoComponent implements OnInit {
  @Input() user!: User
  @Input() permission!: Permission
  @Output() emitRequest = new EventEmitter<ServiceRequest>();
  @Input() requestSelected?: ServiceRequest
  serviceRequests: ServiceRequest[] = []

  constructor(
    private serviceRequestWeb: ServiceRequestServiceService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.user.type == 'EMPLOYEE'){
      this.serviceRequestWeb.getServiceRequestsByCompany(this.permission.company.id!).subscribe((res)=>{
        if(res.ok){
          this.serviceRequests = res.body!
        }else{
          this.toast.success('Ocorreu um erro ao carregar os pedidos!')
        }
      })
    }else if(this.user.type == 'CLIENT'){
      this.serviceRequestWeb.getServiceRequestsByUser(this.user.id!).subscribe((res)=>{
        if(res.ok){
          this.serviceRequests = res.body!
        }else{
          this.toast.success('Ocorreu um erro ao carregar os pedidos!')
        }
      })
    }

  }

  seeRequest(serviceRequest: ServiceRequest) {
    this.emitRequest.emit(serviceRequest!);
  }
}
