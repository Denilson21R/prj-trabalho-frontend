import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user: any;
  
  constructor() { }
  
  ngOnInit(): void {
    if(sessionStorage.getItem('user.id') != null){
      this.user = {
        'id': sessionStorage.getItem('user.id'),
        'name': sessionStorage.getItem('user.name'),
        'email': sessionStorage.getItem('user.email'),
        'type': sessionStorage.getItem('user.type')
      }
    }
  }
}
