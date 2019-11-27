import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInfoPaginaInterface } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info = {} as IInfoPaginaInterface;
  cargada = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInformacion();
    this.cargarEquipo();
  }


  // lee los datos del archivo local data-pagina.json
  private cargarInformacion() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: IInfoPaginaInterface) => {
        this.info = resp;
        this.cargada = true;
      });
  }

// carga la informacion desde FireBase
  private cargarEquipo() {
    this.http.get('https://angular-html-abc32.firebaseio.com/equipo.json')
      .subscribe((resp: any[]) => {
        this.equipo = resp;
      });
  }
}
