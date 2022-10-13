import { Component, OnInit } from '@angular/core';
import {Service} from "../model/Service";

@Component({
  selector: 'app-modal-servico',
  templateUrl: './modal-servico.component.html',
  styleUrls: ['./modal-servico.component.css']
})
export class ModalServicoComponent implements OnInit {

  novoServico: Service = new Service()

  constructor() { }

  ngOnInit(): void {
  }

}
