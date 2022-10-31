import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyInvite} from "../../model/CompanyInvite";
import {WebService} from "../../web.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tabela-convites-usuario',
  templateUrl: './tabela-convites-usuario.component.html',
  styleUrls: ['./tabela-convites-usuario.component.css']
})
export class TabelaConvitesUsuarioComponent implements OnInit {

  @Input() invites!: CompanyInvite[]
  @Output() emitNewCompany = new EventEmitter<Number>();

  constructor(private web: WebService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  alterarConvite(status: Number, invite_id: Number, index: Number, company_id: Number) {
    if(status && invite_id){
      this.web.updateCompanyInvite(status, invite_id).subscribe((res) => {
        if(res.ok){
          this.invites.splice(index.valueOf(), 1)
          if(status == 1){
            this.emitNewCompany.emit(company_id);
          }else{
            this.toast.success('Convite respondido com sucesso!')
          }
        }else{
          this.toast.success('Ocorreu um erro ao responder o convite!')
        }
      })
    }
  }
}
