import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  public imagenModal: string = null;

  public notificacion = new EventEmitter<any>();

  constructor() {
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string, img?: string) {
    // this.imagenModal = img || 'xxx';
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
