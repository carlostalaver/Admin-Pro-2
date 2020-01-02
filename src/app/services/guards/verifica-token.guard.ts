import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {
  }

  canActivate(): Promise<boolean> | boolean {

    const payload = JSON.parse(window.atob(this.usuarioService.token.split('.')[1]));

    const expirado = this.isExpired(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  isExpired(fechaExp: number) {
    const fechaActualSg = (new Date().getTime() / 1000);

    if (fechaExp < fechaActualSg) {
      return true;
    } else {
      return false;
    }

  }

   verificaRenueva(fechaExpSg: number): Promise<boolean> {
     return new Promise((resolve, reject) => {

        const fechaExpToken = new Date(fechaExpSg * 1000);
        const fechaActual = new Date(); // se recomienda que sea el backend quien entregue la fecha

        fechaActual.setTime( fechaActual.getTime() + (4 * 60 * 60 * 1000));
        console.log('%cfecha expiracion', 'background-color: pink;', fechaExpToken);
        console.log('%cfecha renovada', 'background-color: aqua;', fechaActual);

        if (fechaExpToken .getTime() >= fechaActual.getTime()) {
          resolve(true);
        } else {
          this.usuarioService.renuevaToken()
            .subscribe( res => {
              resolve(true);
            }, () => {
              this.router.navigate(['/login']);
              reject(false);
            });
        }

        resolve(true);

     });
   }
}
