import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  cargarMedicos() {

    const url = `${URL_SERVICIOS}/medico`;

    return this.http.get(url)
      .map((resp: any) => {
        this.totalMedicos = resp.totalMedicos;
        return resp.medicos;
      });
  }


  buscarMedico(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url)
      .map((res: any) => {
        return res.medicos;
      });
  }


  borrarMedico(id: string) {
     const url = `${URL_SERVICIOS}/medico/${id}?token=${this.usuarioService.token}`;

     return this.http.delete(url)
       .map((res: any) => {
         Swal.fire('Dr. eliminado', 'Eliminado con exito', 'success');
         return res;
       });
  }

  guardarMedico(medico: Medico) {

    if (medico._id) {
      const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this.usuarioService.token}`;
      return this.http.put(url, medico)
        .map((res: any) => {
          Swal.fire('Médico modificado', medico.nombre, 'success');
          return res.medico;
        });
    } else {
      const url = `${URL_SERVICIOS}/medico?token=${this.usuarioService.token}`;
      return this.http.post(url, { nombre: medico.nombre, hospital: medico.hospital })
        .map((res: any) => {
          Swal.fire('Médico creado', medico.nombre, 'success');
          return res.medico;
        });
    }

  }

  cargarMedico(id: string) {

    const url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url)
        .map((res: any) => res.medico);
  }
}
