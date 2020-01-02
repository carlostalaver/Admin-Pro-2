import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedico();
  }

  cargarMedico() {
    this.medicoService.cargarMedicos()
      .subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
      });
  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedico();
      return;
    }

    this.medicoService.buscarMedico(termino)
      .subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
      });
  }

  editarMedico(medico: Medico) {

  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿ Estas seguro ?',
      text: 'Esta apunto de eliminar al Dr. ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'd33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then(borrar => {
      if (borrar.value) {
        this.medicoService.borrarMedico(medico._id)
          .subscribe(() => {
            this.cargarMedico();
          });
      }
    });

  }

  crearMedico() {

  }

}
