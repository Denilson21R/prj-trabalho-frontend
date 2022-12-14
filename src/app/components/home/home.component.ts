import { Component, OnInit } from '@angular/core';
import {Permission} from "../../model/Permission";
import {PermissionServiceService} from "../../services/permission-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any
  permission!: Permission
  permissionFinded = false

  constructor(
    private permissionWeb: PermissionServiceService
  ) { }

  ngOnInit(): void {
    this.fillUserBySession()
    this.fillUserPermissions()
  }

  private fillUserBySession() {
    if (sessionStorage.getItem('user.id') != null) {
      this.user = {
        'id': sessionStorage.getItem('user.id'),
        'name': sessionStorage.getItem('user.name'),
        'email': sessionStorage.getItem('user.email'),
        'type': sessionStorage.getItem('user.type'),
        'phone': sessionStorage.getItem('user.phone'),
      }
    }
  }

  private fillUserPermissions() {
    if(this.user.type == "EMPLOYEE"){
      this.permissionWeb.getUserPermissions(this.user.id!).subscribe((res) => {
        if (res.ok && res.body != null) {
          this.permission = res.body
        }
        this.permissionFinded = true
      })
    }
  }
}
