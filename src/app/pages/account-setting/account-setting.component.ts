import { Component, OnInit} from '@angular/core';
import { SettingService } from '../../services/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(public settingService: SettingService) { }

  ngOnInit() {
    this.aplicarChectV2();
  }

  cambiarColor(color: string, link: any) {
    this.aplicarCheck(link);
    this.settingService.aplicarTema(color);
  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for (const referencia of selectores) {
      referencia.classList.remove('working');
    }

    link.classList.add('working');

  }

  aplicarChectV2() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.settingService.ajustes.tema;
    for (const referencia of selectores) {
       if (referencia.getAttribute('data-theme') === tema ) {
          referencia.classList.add('working');
          break;
       }
    }
  }

}
