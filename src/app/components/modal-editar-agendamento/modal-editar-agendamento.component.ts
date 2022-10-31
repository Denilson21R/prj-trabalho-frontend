import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Schedule} from "../../model/Schedule";
import {WebService} from "../../web.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-editar-agendamento',
  templateUrl: './modal-editar-agendamento.component.html',
  styleUrls: ['./modal-editar-agendamento.component.css']
})
export class ModalEditarAgendamentoComponent implements OnInit {
  @Input() schedule!: Schedule

  constructor(private web: WebService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  saveSchedule() {
    if(this.schedule){
      this.web.updateSchedule(this.schedule).subscribe((res)=>{
        if(res.ok){
          this.toast.success('Agendamento atualizado com sucesso!')
        }else{
          this.toast.error('Ocorreu um erro durante a atualização do agendamento!')
        }
      })
    }else{
      this.toast.error('Ocorreu um erro ao atualizar o agendamento!')
    }
  }
}
