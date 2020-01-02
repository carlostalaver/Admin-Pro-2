import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugin();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugin();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.validarIgualdad('password', 'password2') });


    this.forma.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123',
      password2: '123',
      condiciones: true

    });
  }

  // Se conoce como una fabrica de funciones
  validarIgualdad(campo1: string, campo2: string): ValidatorFn {
    return (/* group: FromGroup */  group: AbstractControl): { [key: string]: boolean } | null => {

      // si trabajo con group de tipo AbstractControl
      const password1 = group.get(campo1).value;
      const password2 = group.get(campo2).value;

      // si trabajo con group de tipo FormGroup
      // const password = group.controls[campo].value;
      // const password2 = group.controls[campo2].value;

      if (password1 === password2) { // si son iguales pasa la validacion
        return null;
      }

      return {
        passwordDistintas: true
      };
    };
  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      console.log('%cDebe aceptar terminos y condiciones', 'background-color: aqua;');
      Swal.fire({
        icon: 'warning',
        title: 'Importante',
        text: 'Debe aceptar las condiciones',
      });
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario)
      .subscribe( resp => {
        this.router.navigate(['/login']);
      });
  }

}
