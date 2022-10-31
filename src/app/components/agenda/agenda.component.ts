import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {Schedule} from "../../model/Schedule";
import {Permission} from "../../model/Permission";
import {PermissionServiceService} from "../../services/permission-service.service";
import {ScheduleServiceService} from "../../services/schedule-service.service";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  user: User = new User()
  schedules!: Schedule[]
  permission!: Permission

  constructor(
    private permissionWeb: PermissionServiceService,
    private scheduleWeb: ScheduleServiceService
  ) { }

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
    this.scheduleWeb.getSchedulesByClientAnimals(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.schedules = res.body
      }else{
        this.schedules = []
      }
    })
    this.schedules = []
  }

  private fillSchedulesForEmployee() {
    this.permissionWeb.getUserPermissions(this.user.id!).subscribe((res) => {
      if (res.ok && res.body != null) {
        this.permission = res.body
        this.scheduleWeb.getSchedulesByCompany(res.body.company.id!).subscribe((result) => {
          if (result.ok && result.body != null) {
            this.schedules = result.body
          }
        })
      }
    })
    this.schedules = []
  }
}
