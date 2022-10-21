import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";
import {User} from "../model/User";
import {Schedule} from "../model/Schedule";
import {Permission} from "../model/Permission";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  user: User = new User()
  schedules!: Schedule[]
  permission!: Permission

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.user.id = Number(sessionStorage.getItem('user.id')!);
    this.user.type = sessionStorage.getItem('user.type')!;

    if(this.user.type == "EMPLOYEE"){
      this.fillSchedulesForEmployee();
    }else if(this.user.type == "CLIENT"){
      this.fillSchedulesForClient();
    }
  }

  private fillSchedulesForClient() {
    this.web.getSchedulesByClientAnimals(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.schedules = res.body
      }else{
        this.schedules = []
      }
    })
    this.schedules = []
  }

  private fillSchedulesForEmployee() {
    this.web.getUserPermissions(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.permission = res.body
        this.web.getSchedulesByCompany(res.body.company.id!).subscribe((result) => {
          if (result.ok && result.body != null) {
            this.schedules = result.body
          }
        })
      }
    })
    this.schedules = []
  }
}
