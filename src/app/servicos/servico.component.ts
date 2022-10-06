import { Component, OnInit } from '@angular/core';
import {Service} from "../model/Service";
import {WebService} from "../web.service";
import {User} from "../model/User";
import {Schedule} from "../model/Schedule";
import {Permission} from "../model/Permission";

@Component({
  selector: 'app-servicos',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {

  services!: Service[]
  user: User = new User()
  permission?: Permission

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.user.id = Number(sessionStorage.getItem('user.id')!);
    this.web.getUserPermissions(this.user.id).subscribe((res) => {
      if(res.ok && res.body != null){
        this.permission = res.body
        this.web.getServicesByCompany(this.permission.company.id!).subscribe((result)=>{
          if(result.ok){
            this.services = result.body!
            this.services.forEach((service) => {
              console.log(service)
            })
          }
        })
      }
    })

  }

}
