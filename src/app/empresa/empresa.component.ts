import { Component, OnInit } from '@angular/core';
import {Permission} from "../model/Permission";
import {WebService} from "../web.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  user: any;
  permission!: Permission

  constructor(private web: WebService, private router: Router) { }

  ngOnInit(): void {
    this.fillUserBySession();
    this.fillUserPermissions();
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
      }
    })
  }

  private verifyUserCanSeeCompany() {
    if (this.user.type != 'EMPLOYEE' || !this.permission.company_owner) {
      this.router.navigate(['/home'])
    }
  }
}
