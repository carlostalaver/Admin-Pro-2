import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion
      .subscribe(() => {
        console.log('%cNotificando en el modal', 'background-color: aqua;');
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.hospitalService.buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {

        this.hospitales = hospitales;
      });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.crearHospital(hospital.nombre)
      .subscribe((hospitalActualizado: Hospital) => {
        if (hospitalActualizado) {
          Swal.fire('Hospital actualizado', hospitalActualizado.nombre, 'success');
        }
      });
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta apunto de eliminar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'd33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then(borrar => {
      if (borrar.value) {
        this.hospitalService.borrarHospital(hospital._id)
          .subscribe(() => {
            this.cargarHospitales();
          });
      }
    });
  }

  async crearHopital() {
    const { value: text } = await Swal.fire({
      title: 'Crear un nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Intruduzca el nombre del hospital',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    });

    if (text) {


      this.hospitalService.crearHospital(text)
        .subscribe((res: Hospital ) => {
         Swal.fire('Hospital creado', res.nombre, 'success');
         // this.cargarHospitales();
         this.hospitales.push(res);  // esto es mas efeciente que volver a llamar el servicio
        });
    }
  }

  actualizarImagen(hospital: Hospital) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id, hospital.img);
  }

}
