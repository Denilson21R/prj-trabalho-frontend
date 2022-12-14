import { Component, OnInit } from '@angular/core';
import {Service} from "../../model/Service";
import {User} from "../../model/User";
import {Permission} from "../../model/Permission";
import {PermissionServiceService} from "../../services/permission-service.service";
import {ServiceServiceService} from "../../services/service-service.service";

@Component({
  selector: 'app-servicos',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {

  services: Service[] = []
  user: User = new User()
  permission?: Permission
  serviceUpdate?: Service

  constructor(
    private permissionWeb: PermissionServiceService,
    private serviceWeb: ServiceServiceService
  ) { }

  ngOnInit(): void {
    this.user.id = Number(sessionStorage.getItem('user.id')!);
    this.permissionWeb.getUserPermissions(this.user.id).subscribe((res) => {
      if(res.ok && res.body != null){
        this.fillServicesForUser(res.body);
      }
    })

  }

  private fillServicesForUser(res: Permission) {
    this.permission = res
    this.serviceWeb.getServicesByCompany(this.permission!.company.id!).subscribe((result) => {
      if (result.ok) {
        this.services = result.body!
      }
    })
  }

  resetServiceUpdate() {
    this.serviceUpdate = undefined
  }

  reloadServices() {
    this.fillServicesForUser(this.permission!)
  }
}
