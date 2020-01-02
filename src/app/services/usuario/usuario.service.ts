import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
@Injectable()
export class UsuarioService {

  usuario: Usuario = null;
  token: string = null;


  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).map((res: any) => {
      Swal.fire('Usuario creado', usuario.email, 'success');
      return res.usuario;
    });
  }

  login(usuario: Usuario, remerbeme: boolean = false) {
    if (remerbeme) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).map((res: any) => {
      this.guardarStorage(res.id, res.token, res.usuario);
      return true;
    });
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).map((res: any) => {
      this.guardarStorage(res.id, res.token, res.usuario);
      return true;
    });
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;

  }

  estaLogueado(): boolean {
    return Boolean(this.token);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .map((resp: any) => {

        if (usuario._id === this.usuario._id) {
          const usuarioDb: Usuario = resp.usuario;
          this.guardarStorage(usuarioDb._id, this.token, usuarioDb);
        }

        Swal.fire('Usuario actualizado ', usuario.nombre, 'success');
        return true;
      });
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuarioActualizado.img;
        Swal.fire('Imagen actializada', this.usuario.email, 'success');
      })
      .catch(err => {
        Swal.fire('Error al actualizar imagen', this.usuario.email, 'error');
        console.log('%cOcurrio un error al subir la imagen', 'background-color: red;', err);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.usuarios);
  }

  borrarUsuario(id: string) {
    const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  renuevaToken() {
    const url = URL_SERVICIOS + `/login/renuevatoken?token=${this.token}`;
    return this.http.get(url)
      .map(res => {
        this.token = (res as any).token;
        localStorage.setItem('token', this.token);
        return true;
      })
      .catch( err => {
        this.router.navigate(['/login']);
        Swal.fire('No se puedo renovar Token', 'No fue posible renovar el Token', 'error');
        return Observable.throwError(err);
      });
  }
}
