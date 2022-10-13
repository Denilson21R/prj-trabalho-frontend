import { Component, OnInit } from '@angular/core';
import {Animal} from "../model/Animal";
import {WebService} from "../web.service";

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  animals: Animal[] = [];

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.web.getUserAnimals(Number(sessionStorage.getItem('user.id')))
      .subscribe((res) => {
      this.animals = res
    })
  }

}
