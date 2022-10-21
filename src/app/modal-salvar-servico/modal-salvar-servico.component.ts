import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Service} from "../model/Service";
import {Company} from "../model/Company";
import {WebService} from "../web.service";

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

  constructor(private web: WebService) { }

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
      this.web.updateService(this.service).subscribe((res)=>{
        if(res.ok){
          //TODO: show success
        }else{
          //TODO: show error
        }
        this.emitReload.emit(true)
      })

    }else{
      this.web.addService(this.service).subscribe((res)=>{
        if(res.ok){
          //TODO: show success
        }else{
          //TODO: show error
        }
        this.emitReload.emit(true)
      })
    }
  }

  private fillBasicDataOfService() {
    if (!this.service.id) {
      this.service.status = 'ATIVO'
    }
    this.service.company = this.company
  }
}
