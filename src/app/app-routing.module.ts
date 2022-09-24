import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {AgendaComponent} from "./agenda/agenda.component";
import {AnimaisComponent} from "./animais/animais.component";
import {PerfilComponent} from "./perfil/perfil.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'animais', component: AnimaisComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
