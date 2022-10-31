import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Animal} from "../../model/Animal";
import {WebService} from "../../web.service";
import {User} from "../../model/User";
import {ServiceRequest} from "../../model/ServiceRequest";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-animal',
  templateUrl: './modal-animal.component.html',
  styleUrls: ['./modal-animal.component.css']
})
export class ModalAnimalComponent implements OnInit {
  @Input() animalUpdate?: Animal
  animal: Animal = new Animal()
  @Output() emitReload = new EventEmitter<boolean>();

  constructor(private web: WebService, private toast: ToastrService) { }

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
          this.toast.success('Animal atualizado com sucesso!')
        }else{
          this.toast.error('Ocorreu um erro durante a atualização!')
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
        this.toast.success('Animal salvo com sucesso!')
      } else {
        this.toast.error('Ocorreu um erro ao salvar o animal!')
      }
    })
  }
}
