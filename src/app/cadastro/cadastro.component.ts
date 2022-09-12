import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebService } from '../web.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  
  constructor(private web: WebService) { }
  
  ngOnInit(): void {
  }
  
  cadastrar(form: NgForm) {
    if(form.valid){
      this.web.signUpUser(form.value).subscribe(res => {
        console.log(res)
      })
    }else{
      //TODO: exibir erro para o usuário
    }
  }
}
