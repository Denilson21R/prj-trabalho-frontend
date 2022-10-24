import {Component, Input, OnInit} from '@angular/core';
import {CompanyInvite} from "../../model/CompanyInvite";
import {WebService} from "../../web.service";

@Component({
  selector: 'app-tabela-convites-empresa',
  templateUrl: './tabela-convites-empresa.component.html',
  styleUrls: ['./tabela-convites-empresa.component.css']
})
export class TabelaConvitesEmpresaComponent implements OnInit {

  invites: CompanyInvite[] = []
  @Input() company_id!: Number

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.web.getOpeningInvitesForCompany(this.company_id).subscribe((res)=>{
      if(res.ok && res.body && res.body!.length > 0){
        this.invites = res.body
      }else{
        //TODO: show error to user
      }
    })
  }

  cancelInvite(invite_id: Number, index: Number) {
    if(invite_id){
      this.web.updateCompanyInvite(3, invite_id).subscribe((res)=>{
        if(res.ok){
          this.invites.splice(index.valueOf(), 1)
          //TODO: show success to user
        }else{
          //TODO: show error to user
        }
      })
    }
  }
}
