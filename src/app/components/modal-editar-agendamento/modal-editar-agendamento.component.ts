import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Schedule} from "../../model/Schedule";
import {WebService} from "../../web.service";

@Component({
  selector: 'app-modal-editar-agendamento',
  templateUrl: './modal-editar-agendamento.component.html',
  styleUrls: ['./modal-editar-agendamento.component.css']
})
export class ModalEditarAgendamentoComponent implements OnInit {
  @Input() schedule!: Schedule

  constructor(private web: WebService) { }

  ngOnInit(): void {
  }

  saveSchedule() {
    if(this.schedule){
      this.web.updateSchedule(this.schedule).subscribe((res)=>{
        if(res.ok){
          //TODO: show success
        }else{
          //TODO: show error
        }
      })
    }else{
      //TODO: show error
    }
  }
}
