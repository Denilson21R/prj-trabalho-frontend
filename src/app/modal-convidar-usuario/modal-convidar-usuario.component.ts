import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WebService} from "../web.service";
import {Company} from "../model/Company";

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
    //TODO: alert user
    if(this.emailUsuario != ""){
      this.web.addInviteToUserByEmail(this.emailUsuario, this.company).subscribe((res) => {
        if(res.status == 201){
          //criado
          this.emailUsuario = ""
          this.closeModal.nativeElement.click()
        }else if(res.status == 404){
          //usuario nao encontrado
        }else{
          //ocorreu um erro
        }
      })
    }
  }
}
