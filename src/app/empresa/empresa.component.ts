import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Permission} from "../model/Permission";
import {WebService} from "../web.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../model/User";

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  user: any;
  permission!: Permission
  employees: User[] = []
  userSeePermission?: User

  constructor(private web: WebService, private router: Router) { }

  ngOnInit(): void {
    this.fillUserBySession();
    this.fillUserPermissions();
  }

  private fillEmployeesByCompany() {
    this.web.getEmployeesByCompany(this.permission.company.id!).subscribe((res) => {
      if (res.ok && res.body != null && res.body.length > 0) {
        this.employees = res.body
      }
    })
  }

  private fillUserBySession() {
    if (sessionStorage.getItem('user.id') != null) {
      this.user = {
        'id': sessionStorage.getItem('user.id'),
        'type': sessionStorage.getItem('user.type'),
      }
    }
  }

  private fillUserPermissions() {
    this.web.getUserPermissions(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.permission = res.body
        this.verifyUserCanSeeCompany();
        this.fillEmployeesByCompany();
      }
    })
  }

  private verifyUserCanSeeCompany() {
    if (this.user.type != 'EMPLOYEE' || !this.permission.company_owner) {
      this.router.navigate(['/home'])
    }
  }

  seePermissionUser(id_user: Number) {
    if(id_user){
      let newUser = new User()
      newUser.id = id_user
      this.userSeePermission = newUser
    }
  }
}
