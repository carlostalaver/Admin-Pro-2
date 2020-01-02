import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface IAjustes{
  temaUrl: string;
  tema: string;
}

@Injectable()
export class SettingService {
  public  ajustes: IAjustes ={
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }


  }

  aplicarTema(tema: string) {
    const path =  `assets/css/colors/${tema}.css`;
    this.document.getElementById('theme').setAttribute('href', path );
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = path;
    this.guardarAjustes();
  }
}
