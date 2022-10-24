import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from "../../model/Schedule";
import {User} from "../../model/User";
import {Permission} from "../../model/Permission";

@Component({
  selector: 'app-tabela-agendamento',
  templateUrl: './tabela-agendamento.component.html',
  styleUrls: ['./tabela-agendamento.component.css']
})
export class TabelaAgendamentoComponent implements OnInit {
  @Input() schedules!: Schedule[]
  @Input() user!: User
  @Input() permission?: Permission
  scheduleSelected?: Schedule

  constructor() { }

  ngOnInit(): void {
  }

  setScheduleSelected(schedule: Schedule) {
    this.scheduleSelected = schedule
  }
}
