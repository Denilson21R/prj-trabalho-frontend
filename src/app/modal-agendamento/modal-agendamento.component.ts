import { Component, OnInit } from '@angular/core';
import {Schedule} from "../model/Schedule";

@Component({
  selector: 'app-modal-agendamento',
  templateUrl: './modal-agendamento.component.html',
  styleUrls: ['./modal-agendamento.component.css']
})
export class ModalAgendamentoComponent implements OnInit {

  novoAgendamento: Schedule = new Schedule()

  constructor() { }

  ngOnInit(): void {
  }

}
