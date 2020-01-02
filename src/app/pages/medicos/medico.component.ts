import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico(null, null, null, '', null);
  hospital: Hospital = new Hospital(null);

  constructor(public medicoService: MedicoService,
              public hospitalService: HospitalService,
              public router: Router,
              public activateRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });

    this.activateRoute.params.subscribe(params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });


    this.modalUploadService.notificacion.subscribe((res: any) => {
        this.medico.img = res.medicoActualizado.img;
        
    });
  }

  guardarMedico(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico)
      .subscribe((res: Medico) => {
        this.medico = res;
        this.router.navigate(['/medico', this.medico._id]);
      });

  }

  cambioHospital(evento: Event) {

    const idHopital = (evento.target as any).value;
    this.hospitalService.obtenerHospital(idHopital)
      .subscribe((hospital: Hospital) => {
        this.hospital = hospital;
      });
  }

  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id)
      .subscribe((medico: any) => {
        this.medico = medico;
        this.medico.hospital = (medico.hospital as Hospital)._id;
      });
  }


  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
