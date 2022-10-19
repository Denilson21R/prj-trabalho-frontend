import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../model/User";
import {Permission} from "../model/Permission";
import {ServiceRequest} from "../model/ServiceRequest";
import {WebService} from "../web.service";

@Component({
  selector: 'app-tabela-pedido-agendamento',
  templateUrl: './tabela-pedido-agendamento.component.html',
  styleUrls: ['./tabela-pedido-agendamento.component.css']
})
export class TabelaPedidoAgendamentoComponent implements OnInit {
  @Input() user!: User
  @Input() permission!: Permission
  @Output() emitResquest = new EventEmitter<ServiceRequest>();
  @Input() requestSelected?: ServiceRequest
  serviceRequests: ServiceRequest[] = []

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.web.getServiceRequestsByCompany(this.permission.company.id!).subscribe((res)=>{
      if(res.ok){
        this.serviceRequests = res.body!
      }else{
        //TODO: show error to load service requests
      }
    })
  }

  seeRequest(serviceRequest: ServiceRequest) {
    this.emitResquest.emit(serviceRequest!);
  }
}
