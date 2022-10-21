import { Component, OnInit } from '@angular/core';
import {Animal} from "../model/Animal";
import {WebService} from "../web.service";

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  user_id!: Number
  animals: Animal[] = [];
  animalUpdate?: Animal

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.user_id = Number(sessionStorage.getItem('user.id'))
    this.loadAnimals();
  }

  private loadAnimals() {
    this.web.getUserAnimals(this.user_id).subscribe((res) => {
      if (res.ok) {
        this.animals = res.body!
      }
    })
  }

  resetAnimalUpdate() {
    this.animalUpdate = undefined
  }

  reloadAnimals() {
    this.loadAnimals();
  }
}
