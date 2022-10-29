import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {AgendaComponent} from "./components/agenda/agenda.component";
import {AnimaisComponent} from "./components/animais/animais.component";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {ServicoComponent} from "./components/servicos/servico.component";
import {EmpresaComponent} from "./components/empresa/empresa.component";
import {PedidosComponent} from "./components/pedidos/pedidos.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'animais', component: AnimaisComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'servicos', component: ServicoComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
