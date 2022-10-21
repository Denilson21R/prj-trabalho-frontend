import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from "../model/Schedule";

@Component({
  selector: 'app-modal-editar-agendamento',
  templateUrl: './modal-editar-agendamento.component.html',
  styleUrls: ['./modal-editar-agendamento.component.css']
})
export class ModalEditarAgendamentoComponent implements OnInit {
  @Input() schedule!: Schedule

  constructor() { }

  ngOnInit(): void {
  }

}
