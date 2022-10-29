import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WebService} from "../../web.service";
import {Company} from "../../model/Company";

@Component({
  selector: 'app-modal-convidar-usuario',
  templateUrl: './modal-convidar-usuario.component.html',
  styleUrls: ['./modal-convidar-usuario.component.css']
})
export class ModalConvidarUsuarioComponent implements OnInit {

  emailUsuario!: String
  @Input() company!: Number
  @ViewChild('btnCancelar') closeModal!: ElementRef

  constructor(private web: WebService) { }

  ngOnInit(): void {
  }

  convidar() {
    if(this.emailUsuario != "" && this.emailUsuario != sessionStorage.getItem('user.email')){
      this.web.addInviteToUserByEmail(this.emailUsuario, this.company).subscribe((res) => {
        if(res.status == 201){
          this.emailUsuario = ""
          //TODO: emit new invite
        }else if(res.status == 404){
          //TODO: usuario nao encontrado
        }else{
          //TODO: ocorreu um erro
        }
      })
    }else{
      //TODO:show error
    }
    this.closeModal.nativeElement.click()
  }
}
