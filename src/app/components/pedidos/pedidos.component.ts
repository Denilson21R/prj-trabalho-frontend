import { Component, OnInit } from '@angular/core';
import {ServiceRequest} from "../../model/ServiceRequest";
import {User} from "../../model/User";
import {WebService} from "../../web.service";
import {Permission} from "../../model/Permission";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  user: User = new User();
  permission!: Permission
  serviceRequest?: ServiceRequest

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.user.id = Number(sessionStorage.getItem('user.id')!)
    this.user.type = sessionStorage.getItem('user.type')!
    this.fillUserPermissions()
  }

  private fillUserPermissions() {
    this.web.getUserPermissions(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.permission = res.body
      }
    })
  }

  setRequestSee(request: ServiceRequest) {
    this.serviceRequest = request
  }
}
