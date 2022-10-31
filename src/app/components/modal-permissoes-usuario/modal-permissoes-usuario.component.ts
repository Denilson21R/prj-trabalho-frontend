import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Permission} from "../../model/Permission";
import {User} from "../../model/User";
import {WebService} from "../../web.service";
import {ToastrService} from "ngx-toastr";
import {PermissionServiceService} from "../../services/permission-service.service";

@Component({
  selector: 'app-modal-permissoes-usuario',
  templateUrl: './modal-permissoes-usuario.component.html',
  styleUrls: ['./modal-permissoes-usuario.component.css']
})
export class ModalPermissoesUsuarioComponent implements OnInit {
  @Input() user?: User
  permission?: Permission
  @ViewChild('btnCancelar') closeModal!: ElementRef

  constructor(
    private permissionWeb: PermissionServiceService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['user'].currentValue?.id) {
      this.permissionWeb.getUserPermissions(changes['user'].currentValue?.id).subscribe((res) => {
        if(res.ok){
          this.user = res.body?.user!
          this.permission = res.body!
        }
      })
    }
  }

  updatePermission() {
    if(this.permission){
      this.permissionWeb.updatePermission(this.permission).subscribe((res)=>{
        if(res.ok){
          this.toast.success('Permissões atualizadas com sucesso!')
        }else{
          this.toast.error('Ocorreu um erro ao atualizar as permissões!')
        }
        this.closeModal.nativeElement.click()
      })
    }
  }
}
