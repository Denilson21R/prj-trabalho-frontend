import {Component, Input, OnInit} from '@angular/core';
import {CompanyInvite} from "../../model/CompanyInvite";
import {ToastrService} from "ngx-toastr";
import {CompanyInviteServiceService} from "../../services/company-invite-service.service";

@Component({
  selector: 'app-tabela-convites-empresa',
  templateUrl: './tabela-convites-empresa.component.html',
  styleUrls: ['./tabela-convites-empresa.component.css']
})
export class TabelaConvitesEmpresaComponent implements OnInit {

  invites: CompanyInvite[] = []
  @Input() company_id!: Number

  constructor(
    private companyInviteWeb: CompanyInviteServiceService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.companyInviteWeb.getOpeningInvitesForCompany(this.company_id).subscribe((res)=>{
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
      this.companyInviteWeb.updateCompanyInvite(3, invite_id).subscribe((res)=>{
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
