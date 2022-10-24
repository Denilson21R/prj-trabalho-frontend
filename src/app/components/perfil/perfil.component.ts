import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {WebService} from "../../web.service";
import {Permission} from "../../model/Permission";
import {CompanyInvite} from "../../model/CompanyInvite";
import {Company} from "../../model/Company";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  user: User = new User()
  permission!: Permission
  invites!: CompanyInvite[]

  constructor(private web: WebService) { }

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
    this.web.updateUser(this.user).subscribe((res) => {
      if(res.ok){
        //TODO: show success to user
        //TODO: update session
      }else{
        //TODO: show error to user
      }
    })
  }

  private fillUserPermissions() {
    this.web.getUserPermissions(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.permission = res.body
      }
      if(this.user.type == "EMPLOYEE"){
        this.getOpeningInviterForUser();
      }
    })
  }

  private getOpeningInviterForUser() {
    this.web.getOpeningInvitesForUser(this.user.id!).subscribe((res) => {
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
      this.web.addPermission(this.permission).subscribe((res)=> {
        if(res.ok){
          //TODO: show success
        }else{
          //TODO: show error
        }
      })
    }
  }
}
