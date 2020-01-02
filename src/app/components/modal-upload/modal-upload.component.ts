import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File = null;
  imagenTemporal: string | ArrayBuffer = null;

  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUploadService) {}

  ngOnInit() {
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
    //#region para mostrar la previa de la imagen antes de actualizarla
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal = reader.result;
    //#endregion

    archivo = null;

  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then( res => {
        console.log('%cimagen subida', 'background-color: aqua;', res);
        this.modalUploadService.notificacion.emit(res);
        this.cerrarModal();
      })
      .catch( err => {
        console.log('%cError al subir imagen', 'background-color: red;', err);
      });
  }

  cerrarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }
}
