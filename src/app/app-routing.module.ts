import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {titulo: 'Login'} },
  { path: 'register', component: RegisterComponent, data: {titulo: 'Register'} },
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: NopagefoundComponent, data: {titulo: 'Ruta por defecto'} }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})], /*{useHash: true} para utilizar el patron que implementa # en las rutas */
  exports: [RouterModule]
})
export class AppRoutingModule { }
