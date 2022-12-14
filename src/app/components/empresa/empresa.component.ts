import {Component, OnInit} from '@angular/core';
import {Permission} from "../../model/Permission";
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {ToastrService} from "ngx-toastr";
import {PermissionServiceService} from "../../services/permission-service.service";
import {UserServiceService} from "../../services/user-service.service";
import {CompanyServiceService} from "../../services/company-service.service";

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

  constructor(
    private companyWeb: CompanyServiceService,
    private permissionWeb: PermissionServiceService,
    private userWeb: UserServiceService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.fillUserBySession();
    this.fillUserPermissions();
  }

  private fillEmployeesByCompany() {
    this.userWeb.getEmployeesByCompany(this.permission.company.id!).subscribe((res) => {
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
    this.permissionWeb.getUserPermissions(this.user.id!).subscribe((res) => {
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

  updateCompany() {
    this.companyWeb.updateCompany(this.permission.company).subscribe((res)=>{
      if(res.ok){
        this.toast.success('Dados atualizados com sucesso!')
      }else{
        this.toast.error('Ocorreu um erro ao atualizar os dados!')
      }
    })
  }
}
