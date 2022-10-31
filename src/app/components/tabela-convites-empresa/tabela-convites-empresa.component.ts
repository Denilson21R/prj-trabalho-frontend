import {Component, Input, OnInit} from '@angular/core';
import {CompanyInvite} from "../../model/CompanyInvite";
import {WebService} from "../../web.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tabela-convites-empresa',
  templateUrl: './tabela-convites-empresa.component.html',
  styleUrls: ['./tabela-convites-empresa.component.css']
})
export class TabelaConvitesEmpresaComponent implements OnInit {

  invites: CompanyInvite[] = []
  @Input() company_id!: Number

  constructor(private web: WebService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.web.getOpeningInvitesForCompany(this.company_id).subscribe((res)=>{
      if(res.ok || res.status == 204){
        if(res.body){
          this.invites = res.body!
        }
      }else{
        this.toast.error('Ocorreu um erro ao carregar os convites!')
      }
    })
  }

  cancelInvite(invite_id: Number, index: Number) {
    if(invite_id){
      this.web.updateCompanyInvite(3, invite_id).subscribe((res)=>{
        if(res.ok){
          this.invites.splice(index.valueOf(), 1)
          this.toast.error('Convite cancelado com sucesso!')
        }else{
          this.toast.error('Ocorreu um erro ao cancelar o convite!')
        }
      })
    }
  }
}
