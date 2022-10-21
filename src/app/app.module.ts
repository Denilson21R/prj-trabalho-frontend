import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AnimaisComponent } from './animais/animais.component';
import { HeaderComponent } from './header/header.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ServicoComponent } from './servicos/servico.component';
import { CardEmpresaComponent } from './card-empresa/card-empresa.component';
import { EmpresaComponent } from './empresa/empresa.component';
import {ModalSalvarServicoComponent} from './modal-salvar-servico/modal-salvar-servico.component';
import { ModalAgendamentoComponent } from './modal-agendamento/modal-agendamento.component';
import { ModalAnimalComponent } from './modal-animal/modal-animal.component';
import { ModalConvidarUsuarioComponent } from './modal-convidar-usuario/modal-convidar-usuario.component';
import { TabelaConvitesUsuarioComponent } from './tabela-convites-usuario/tabela-convites-usuario.component';
import { TabelaConvitesEmpresaComponent } from './tabela-convites-empresa/tabela-convites-empresa.component';
import { TabelaFuncionariosComponent } from './tabela-funcionarios/tabela-funcionarios.component';
import { ModalPermissoesUsuarioComponent } from './modal-permissoes-usuario/modal-permissoes-usuario.component';
import { TabelaPedidoAgendamentoComponent } from './tabela-pedido-agendamento/tabela-pedido-agendamento.component';
import { ModalPedidoAgendamentoComponent } from './modal-pedido-agendamento/modal-pedido-agendamento.component';
import { ModalCriarEmpresaComponent } from './modal-criar-empresa/modal-criar-empresa.component';
import { TabelaAgendamentoComponent } from './tabela-agendamento/tabela-agendamento.component';
import { ModalVisualizarAgendamentoComponent } from './modal-visualizar-agendamento/modal-visualizar-agendamento.component';
import { ModalEditarAgendamentoComponent } from './modal-editar-agendamento/modal-editar-agendamento.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    MenuComponent,
    AgendaComponent,
    AnimaisComponent,
    HeaderComponent,
    PerfilComponent,
    ServicoComponent,
    CardEmpresaComponent,
    EmpresaComponent,
    ModalSalvarServicoComponent,
    ModalAgendamentoComponent,
    ModalAnimalComponent,
    ModalConvidarUsuarioComponent,
    TabelaConvitesUsuarioComponent,
    TabelaConvitesEmpresaComponent,
    TabelaFuncionariosComponent,
    ModalPermissoesUsuarioComponent,
    TabelaPedidoAgendamentoComponent,
    ModalPedidoAgendamentoComponent,
    ModalCriarEmpresaComponent,
    TabelaAgendamentoComponent,
    ModalVisualizarAgendamentoComponent,
    ModalEditarAgendamentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
