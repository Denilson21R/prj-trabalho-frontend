import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from "../../model/Schedule";

@Component({
  selector: 'app-modal-visualizar-agendamento',
  templateUrl: './modal-visualizar-agendamento.component.html',
  styleUrls: ['./modal-visualizar-agendamento.component.css']
})
export class ModalVisualizarAgendamentoComponent implements OnInit {
  @Input() schedule?: Schedule

  constructor() { }

  ngOnInit(): void {
  }

}
