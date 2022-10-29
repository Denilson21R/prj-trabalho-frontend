import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AnimaisComponent } from './components/animais/animais.component';
import { HeaderComponent } from './components/header/header.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ServicoComponent } from './components/servicos/servico.component';
import { CardEmpresaComponent } from './components/card-empresa/card-empresa.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import {ModalSalvarServicoComponent} from './components/modal-salvar-servico/modal-salvar-servico.component';
import { ModalAgendamentoComponent } from './components/modal-agendamento/modal-agendamento.component';
import { ModalAnimalComponent } from './components/modal-animal/modal-animal.component';
import { ModalConvidarUsuarioComponent } from './components/modal-convidar-usuario/modal-convidar-usuario.component';
import { TabelaConvitesUsuarioComponent } from './components/tabela-convites-usuario/tabela-convites-usuario.component';
import { TabelaConvitesEmpresaComponent } from './components/tabela-convites-empresa/tabela-convites-empresa.component';
import { TabelaFuncionariosComponent } from './components/tabela-funcionarios/tabela-funcionarios.component';
import { ModalPermissoesUsuarioComponent } from './components/modal-permissoes-usuario/modal-permissoes-usuario.component';
import { TabelaPedidoAgendamentoComponent } from './components/tabela-pedido-agendamento/tabela-pedido-agendamento.component';
import { ModalPedidoAgendamentoComponent } from './components/modal-pedido-agendamento/modal-pedido-agendamento.component';
import { ModalCriarEmpresaComponent } from './components/modal-criar-empresa/modal-criar-empresa.component';
import { TabelaAgendamentoComponent } from './components/tabela-agendamento/tabela-agendamento.component';
import { ModalVisualizarAgendamentoComponent } from './components/modal-visualizar-agendamento/modal-visualizar-agendamento.component';
import { ModalEditarAgendamentoComponent } from './components/modal-editar-agendamento/modal-editar-agendamento.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ContadoresDadosComponent } from './components/contadores-dados/contadores-dados.component';

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
    PedidosComponent,
    ContadoresDadosComponent,
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
