import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario = null;
  imagenSubir: File = null;
  imagenTemporal: string | ArrayBuffer = null;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  guardar(value: Partial<Usuario>) {
    this.usuario.nombre = value.nombre;

    if (!this.usuario.google) {
      this.usuario.email = value.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }


  seleccionImage(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    console.log('evento ', archivo);

    //#region para mostrar la previa de la imagen antes de actualizarla
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal = reader.result;
    //#endregion

  }

  carbiarImagen() {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
