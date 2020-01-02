import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {


  constructor(public usuarioService: UsuarioService, public router: Router) {}
  canActivate(): boolean {
    const isLog = this.usuarioService.estaLogueado();
    if (isLog) {
      return isLog;
    } else {
      this.router.navigate(['/login']);
      return isLog;
    }
  }

}
