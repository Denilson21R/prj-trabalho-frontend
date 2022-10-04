import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //get company permissions
    //if dont have company show to crate or join to one
    //if have company show schedules
  }

}
