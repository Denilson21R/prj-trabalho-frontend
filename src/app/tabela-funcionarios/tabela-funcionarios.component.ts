import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../model/User";

@Component({
  selector: 'app-tabela-funcionarios',
  templateUrl: './tabela-funcionarios.component.html',
  styleUrls: ['./tabela-funcionarios.component.css']
})
export class TabelaFuncionariosComponent implements OnInit {
  @Input() employees!: User[]
  @Output() emitUserPermission = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
  }

  seeUser(employee: User) {
    this.emitUserPermission.emit(employee.id!);
  }
}
