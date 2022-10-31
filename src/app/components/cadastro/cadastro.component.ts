import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserServiceService} from "../../services/user-service.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  constructor(
    private userWeb: UserServiceService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {
    if(form.valid){
      this.userWeb.signUpUser(form.value).subscribe(res => {
        this.router.navigate(['login'])
        //TODO: campo repita a senha no formulario de cadastro
      })
    }else{
      this.toast.error('Ocorreu um erro durante o cadastro!')
    }
  }
}
