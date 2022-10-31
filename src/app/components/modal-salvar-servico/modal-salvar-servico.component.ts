import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Service} from "../../model/Service";
import {Company} from "../../model/Company";
import {WebService} from "../../web.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-salvar-servico',
  templateUrl: './modal-salvar-servico.component.html',
  styleUrls: ['./modal-salvar-servico.component.css']
})
export class ModalSalvarServicoComponent implements OnInit {
  service: Service = new Service()
  @Input() company!: Company
  @Input() serviceUpdate?: Service
  @Output() emitReload = new EventEmitter<boolean>();

  constructor(private web: WebService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes["serviceUpdate"].currentValue != null){
      this.service = this.serviceUpdate!
    }else{
      this.service = new Service()
    }
  }

  saveService() {
    this.fillBasicDataOfService();
    if(this.serviceUpdate){
      this.updateService();
    }else{
      this.createService();
    }
  }

  private createService() {
    this.web.addService(this.service).subscribe((res) => {
      if (res.ok) {
        this.toast.success('Serviço criado com sucesso!')
      } else {
        this.toast.error('Ocorreu um erro ao criar o serviço!')
      }
      this.emitReload.emit(true)
    })
  }

  private updateService() {
    this.web.updateService(this.service).subscribe((res) => {
      if (res.ok) {
        this.toast.success('Serviço atualizado com sucesso!')
      } else {
        this.toast.error('Ocorreu um erro ao salvar o serviço!')
      }
      this.emitReload.emit(true)
    })
  }

  private fillBasicDataOfService() {
    if (!this.service.id) {
      this.service.status = 'ATIVO'
    }
    this.service.company = this.company
  }
}
