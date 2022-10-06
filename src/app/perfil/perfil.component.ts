import { Component, OnInit } from '@angular/core';
import {User} from "../model/User";
import {NgForm} from "@angular/forms";
import {WebService} from "../web.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  user: User = new User();

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.user.id = Number(sessionStorage.getItem('user.id')!);
    this.user.name = sessionStorage.getItem('user.name')!;
    this.user.email = sessionStorage.getItem('user.email')!;
    this.user.phone = sessionStorage.getItem('user.phone')!;
    this.user.pathImage = sessionStorage.getItem('user.pathImage')!;
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

  processFile(event: Event) {
    //TODO: save user image
  }
}
