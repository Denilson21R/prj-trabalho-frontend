import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import {Permission} from "../model/Permission";
import {WebService} from "../web.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  permission!: Permission

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.fillUserBySession();
    this.fillUserPermissions();
  }

  private fillUserBySession() {
    if (sessionStorage.getItem('user.id') != null) {
      this.user = {
        'id': sessionStorage.getItem('user.id'),
        'name': sessionStorage.getItem('user.name'),
        'email': sessionStorage.getItem('user.email'),
        'type': sessionStorage.getItem('user.type'),
        'phone': sessionStorage.getItem('user.phone'),
        'pathImage': sessionStorage.getItem('user.pathImage')
      }
    }
  }

  private fillUserPermissions() {
    this.web.getUserPermissions(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.permission = res.body
      }
    })
  }
}
