import {Component, Input, OnInit} from '@angular/core';
import {Permission} from "../model/Permission";

@Component({
  selector: 'app-card-empresa',
  templateUrl: './card-empresa.component.html',
  styleUrls: ['./card-empresa.component.css']
})
export class CardEmpresaComponent implements OnInit {

  @Input() company_name!: String

  constructor() { }

  ngOnInit(): void {
  }

}
