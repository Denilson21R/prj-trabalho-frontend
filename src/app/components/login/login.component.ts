import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
import {ToastrService} from "ngx-toastr";
import {UserServiceService} from "../../services/user-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userWeb: UserServiceService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.length > 0){
      this.router.navigate(['home'])
    }else{
      sessionStorage.clear()
    }
  }

  login(form: NgForm) {
    if(form.valid){
      this.userWeb.signInUser(form.value).subscribe((res) => {
        if(res.status == 200){
          this.saveUserDataInSession(res);
          this.router.navigate(['home'])
        }else if(res.status == 204){
          this.toast.error('Senha ou e-mail incorretos!')
        }else{
          this.toast.error('Ocorreu um erro durante o login!')
        }
      })
    }else{
      this.toast.error('Dados inválidos!')
    }
  }

  private saveUserDataInSession(res: any) {
    sessionStorage.setItem('user.id', res.body.id);
    sessionStorage.setItem('user.name', res.body.name);
    sessionStorage.setItem('user.email', res.body.email);
    sessionStorage.setItem('user.type', res.body.type);
    sessionStorage.setItem('user.phone', res.body.phone);
  }
}
