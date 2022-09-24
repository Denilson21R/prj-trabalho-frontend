import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName!: String

  constructor(private route: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user.name') != undefined){
      this.userName = sessionStorage.getItem('user.name')!
    }
  }

  sair() {
    sessionStorage.clear()
    this.route.navigate(["login"])
  }
}
