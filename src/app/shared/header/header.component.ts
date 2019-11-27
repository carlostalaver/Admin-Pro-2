import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public infoPaginaService: InfoPaginaService,
              public router: Router) {
  }

  ngOnInit() {
  }

  buscarProducto(value: string): void {
    if (value.length < 1) {
     return;
    }
    this.router.navigate(['/search', value]);
  }

}
