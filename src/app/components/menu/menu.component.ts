import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userType!: String

  constructor(private route: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user.type') != undefined){
      this.userType = sessionStorage.getItem('user.type')!
    }
  }
}
