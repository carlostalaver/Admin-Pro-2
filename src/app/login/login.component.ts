import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugin();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  rememberme: boolean = true;
  email: string = null;
  auth2: any;


  constructor(public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugin();
    this.email = localStorage.getItem('email') || '';
    this.rememberme = this.email ? true : false;
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }
  googleInit() {
    try {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '47599319025-v116ak4t1c3la7i03tmcipq9356rg6qd.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.attachSignin(document.getElementById('btnGoogle'));
      });
    } catch (err) {
      console.log('%cgapi', 'background-color: aqua;', err);
    }
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);

      this.usuarioService.loginGoogle(token)
        .subscribe( resp => {
         /*  this.router.navigate(['/dashboard']); */

         window.location.href = '#/dashboard'; // se usa este metodo xq con this.router la pagina no se mestra correctamente.
        });
    });
  }

  ingresar(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const usuario: Usuario = new Usuario(null, form.value.email, form.value.password);
    this.usuarioService.login(usuario, form.value.rememberme)
      .subscribe(resp => {
        this.router.navigate(['/dashboard']);
      });
  }

}
