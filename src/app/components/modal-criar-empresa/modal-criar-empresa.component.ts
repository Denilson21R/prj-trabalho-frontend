import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Company} from "../../model/Company";
import {WebService} from "../../web.service";
import {User} from "../../model/User";
import {Permission} from "../../model/Permission";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PermissionServiceService} from "../../services/permission-service.service";

@Component({
  selector: 'app-modal-criar-empresa',
  templateUrl: './modal-criar-empresa.component.html',
  styleUrls: ['./modal-criar-empresa.component.css']
})
export class ModalCriarEmpresaComponent implements OnInit {
  company: Company = new Company()
  @ViewChild("btnCancelar") btnCancelar!: ElementRef<HTMLElement>

  constructor(
    private web: WebService,
    private router: Router,
    private toast: ToastrService,
    private permissionWeb: PermissionServiceService
  ) { }

  ngOnInit(): void {
  }

  saveCompany() {
    this.fillBasicDataForCompany();
    this.web.addCompany(this.company).subscribe((res)=>{
      if(res.ok){
        let permission = this.fillPermissionData(res);
        this.permissionWeb.addPermission(permission).subscribe((response)=>{
          if(response.ok){
            this.router.navigate(["/empresa"])
          }else{
            this.toast.error('Ocorreu um erro ao salvar a empresa!')
          }
        })
      }else{
        this.toast.error('Ocorreu um erro ao salvar a empresa!')
      }
      this.btnCancelar.nativeElement.click()
    })
  }

  private fillPermissionData(res: HttpResponse<Company>) {
    let user = new User()
    user.id = Number(sessionStorage.getItem('user.id'))
    return new Permission(user, res.body!, true, true, true)
  }

  private fillBasicDataForCompany() {
    this.company.status = "ATIVO"
    let user: User = new User()
    user.id = Number(sessionStorage.getItem('user.id'))
    this.company.user_create = user
  }
}
