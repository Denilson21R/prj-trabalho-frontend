import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {WebService} from "../../web.service";
import {Permission} from "../../model/Permission";
import {CompanyInvite} from "../../model/CompanyInvite";
import {Company} from "../../model/Company";
import {ToastrService} from "ngx-toastr";
import {UserServiceService} from "../../services/user-service.service";
import {PermissionServiceService} from "../../services/permission-service.service";
import {CompanyInviteServiceService} from "../../services/company-invite-service.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  user: User = new User()
  permission!: Permission
  invites!: CompanyInvite[]

  constructor(
    private companyInviteWeb: CompanyInviteServiceService,
    private permissionWeb: PermissionServiceService,
    private userWeb: UserServiceService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.fillUserBySession();
    this.fillUserPermissions()
  }

  private fillUserBySession() {
    this.user.id = Number(sessionStorage.getItem('user.id')!);
    this.user.name = sessionStorage.getItem('user.name')!;
    this.user.type = sessionStorage.getItem('user.type')!;
    this.user.email = sessionStorage.getItem('user.email')!;
    this.user.phone = sessionStorage.getItem('user.phone')!;
  }

  updatePerfil() {
    this.userWeb.updateUser(this.user).subscribe((res) => {
      if(res.ok){
        this.toast.success('Dados atualizados com sucesso!')
      }else{
        this.toast.error('Ocorreu um erro ao atualizar os dados!')
      }
    })
  }

  private fillUserPermissions() {
    this.permissionWeb.getUserPermissions(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.permission = res.body
      }
      if(this.user.type == "EMPLOYEE"){
        this.getOpeningInviterForUser();
      }
    })
  }

  private getOpeningInviterForUser() {
    this.companyInviteWeb.getOpeningInvitesForUser(this.user.id!).subscribe((res) => {
      if (res.ok) {
        this.invites = res.body!
      }
    })
  }

  addNewPermission(value: Number) {
    if(value != null){
      let newCompany = new Company()
      newCompany.id = value
      this.permission = new Permission(this.user, newCompany, false, false, false)
      this.permissionWeb.addPermission(this.permission).subscribe((res)=> {
        if(res.ok){
          this.toast.success('Convite aceito com sucesso!')
        }else{
          this.toast.error('Ocorreu um erro ao aceitar o convite!')
        }
      })
    }
  }
}
