import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userName!: String

  constructor(private route: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user.name') != undefined){
      this.userName = sessionStorage.getItem('user.name') ?? ""
    }
  }

  sair() {
    sessionStorage.clear()
    this.route.navigate(["login"])
  }
}
