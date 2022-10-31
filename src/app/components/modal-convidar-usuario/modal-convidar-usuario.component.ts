import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WebService} from "../../web.service";
import {Company} from "../../model/Company";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-convidar-usuario',
  templateUrl: './modal-convidar-usuario.component.html',
  styleUrls: ['./modal-convidar-usuario.component.css']
})
export class ModalConvidarUsuarioComponent implements OnInit {

  emailUsuario!: String
  @Input() company!: Number
  @ViewChild('btnCancelar') closeModal!: ElementRef

  constructor(private web: WebService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  convidar() {
    if(this.emailUsuario != "" && this.emailUsuario != sessionStorage.getItem('user.email')){
      this.web.addInviteToUserByEmail(this.emailUsuario, this.company).subscribe((res) => {
        if(res.status == 201){
          this.emailUsuario = ""
          this.toast.success('Usuário convidado com sucesso!')
        }else if(res.status == 404){
          this.toast.error('Usuário não encontrado!')
        }else{
          this.toast.error('Ocorreu um erro ao convidar um usuário!')
        }
      })
      this.closeModal.nativeElement.click()
    }
  }
}
