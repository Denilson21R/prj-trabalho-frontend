import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Permission} from "../../model/Permission";
import {ScheduleServiceService} from "../../services/schedule-service.service";
import {ServiceServiceService} from "../../services/service-service.service";

@Component({
  selector: 'app-contadores-dados',
  templateUrl: './contadores-dados.component.html',
  styleUrls: ['./contadores-dados.component.css']
})
export class ContadoresDadosComponent implements OnInit {
  @Input() user: any
  @Input() permission?: Permission
  qtddServices?: Number
  qtddSchedules?: Number

  constructor(
    private scheduleWeb: ScheduleServiceService,
    private serviceWeb: ServiceServiceService
  ) { }

  ngOnInit(): void {
    if(this.user.type == "CLIENT"){
      this.fillServicesAndSchedulesForClient();
    }else if(this.user.type == "EMPLOYEE" && this.permission != null){
      this.fillServicesAndScheduleForEmployee();
    }
  }

  private fillServicesAndSchedulesForClient() {
    this.scheduleWeb.getQtddSchedulesClient(this.user.id).subscribe((res) => {
      if (res.ok) {
        this.qtddSchedules = res.body!
        this.serviceWeb.getQtddServicesClient(this.user.id).subscribe((response) => {
          this.qtddServices = response.body!
        })
      }
    })
  }

  private fillServicesAndScheduleForEmployee() {
    this.scheduleWeb.getQtddSchedulesCompany(this.permission!.company.id!).subscribe((res) => {
      if (res.ok) {
        this.qtddSchedules = res.body!
        this.serviceWeb.getQtddServicesCompany(this.permission?.company.id!).subscribe((response) => {
          this.qtddServices = response.body!
        })
      }
    })
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes["permission"].currentValue != null){
      this.permission = changes["permission"].currentValue
    }
  }

}
