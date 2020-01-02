import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable()
export class HospitalService {
  totalHospitales: number =  0;

  constructor(public http: HttpClient, public usuarioSercie: UsuarioService) { }

  cargarHospitales() {
    const url = URL_SERVICIOS + `/hospital`;
    return this.http.get(url)
      .map( (resp: any) => {
        this.totalHospitales = resp.totalHospitales;
        return resp.hospitales;
      });
  }

  obtenerHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}`;

    return this.http.get(url)
      .map((resp: any) => resp.hospital);
  }

  borrarHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.usuarioSercie.token}`;

    return this.http.delete(url)
    .map( res => {
      Swal.fire('Hospital eliminado', 'Eliminado con exito', 'success');
      return true;
    });

  }

  crearHospital( nombre: string ) {
    const url = `${URL_SERVICIOS}/hospital?token=${this.usuarioSercie.token}`;
    return this.http.post(url, {nombre})
      .map((res: any) => {
        return res.hospital;
      });
  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.hospitales);
  }

  actualizarHospital( hospital: Hospital ){
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.usuarioSercie.token;

    return this.http.put(url, hospital)
      .map( (resp: any) =>  resp.hospital);
  }
}
