import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Animal} from "../model/Animal";
import {WebService} from "../web.service";
import {User} from "../model/User";
import {ServiceRequest} from "../model/ServiceRequest";

@Component({
  selector: 'app-modal-animal',
  templateUrl: './modal-animal.component.html',
  styleUrls: ['./modal-animal.component.css']
})
export class ModalAnimalComponent implements OnInit {
  @Input() animalUpdate?: Animal
  animal: Animal = new Animal()
  @Output() emitReload = new EventEmitter<boolean>();

  constructor(private web: WebService) { }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChanges){
    if(change['animalUpdate']?.currentValue != null){
      this.animal = this.animalUpdate!
    }else{
      this.animal = new Animal()
    }
  }

  resetAnimal() {
    this.animal = new Animal()
  }

  saveAnimal() {
    if(this.animal.id){
      this.web.updateAnimal(this.animal).subscribe((res)=>{
        if(res.ok){
          this.emitReload.emit(true)
          //TODO: show success
        }else{
          //TODO: show error
        }
      })
    }else{
      this.saveNewAnimal();
    }
  }

  private saveNewAnimal() {
    let owner: User = new User()
    owner.id = Number(sessionStorage.getItem('user.id'))
    this.animal.owner = owner
    this.web.addAnimal(this.animal).subscribe((res) => {
      if (res.ok) {
        this.emitReload.emit(true)
        //TODO: show success
      } else {
        //TODO: show error
      }
    })
  }
}
