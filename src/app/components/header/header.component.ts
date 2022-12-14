import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CompanyInvite} from "../../model/CompanyInvite";
import {CompanyInviteServiceService} from "../../services/company-invite-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId!: Number
  userName!: string
  userType!: String
  invites: CompanyInvite[] = []

  constructor(
    private route: Router,
    private companyInviteWeb: CompanyInviteServiceService
  ) { }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('user.id')!)
    this.userName = sessionStorage.getItem('user.name')!
    this.userType = sessionStorage.getItem('user.type')!
    this.getOpeningInviterForUser()
  }

  private getOpeningInviterForUser() {
    this.companyInviteWeb.getOpeningInvitesForUser(this.userId).subscribe((res) => {
      if (res.ok) {
        this.invites = res.body!
      }
    })
  }

  logout() {
    sessionStorage.clear()
    this.route.navigate(["login"])
  }
}
