import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebService } from '../../web.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private web: WebService, private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.length > 0){
      this.router.navigate(['home'])
    }else{
      sessionStorage.clear()
    }
  }

  login(form: NgForm) {
    if(form.valid){
      this.web.signInUser(form.value).subscribe(res => {
        this.saveUserDataInSession(res);
        this.router.navigate(['home'])
      })
    }else{
      //TODO: show error message to user
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
