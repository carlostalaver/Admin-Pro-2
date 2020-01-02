import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
      .subscribe( res => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.totalUsuarios;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino)
      .subscribe((resp: Usuario[]) => {
        console.log('%clos usuarios', 'background-color: aqua;', resp);
        this.usuarios = resp;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta apunto de eliminar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'd33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then(borrar => {
      if (borrar.value) {
        this.usuarioService.borrarUsuario(usuario._id)
          .subscribe((resp: any) => {
            if (this.totalRegistros <= 5) {
              this.desde = 0;
            } else if ((this.totalRegistros - 1) === this.desde) {
                this.desde -= 5;
            }
            this.cargarUsuarios();
            Swal.fire('Usuario Elminado', 'El usuario ha sido eliminado exitosamente', 'success');
          });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe( res => {
        console.log('%cUsuario actualizado', 'background-color: aqua;', res);
      });
  }

  mostrarModal(usuario: Usuario) {
    this.modalUploadService.mostrarModal('usuarios', usuario._id, usuario.img);
  }

}
