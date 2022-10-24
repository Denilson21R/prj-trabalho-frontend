import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebService } from '../../web.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private web: WebService, private router: Router) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {
    if(form.valid){
      this.web.signUpUser(form.value).subscribe(res => {
        this.router.navigate(['login'])
        //TODO: campo repita a senha no formulario de cadastro
      })
    }else{
      //TODO: exibir erro para o usuário
    }
  }
}
