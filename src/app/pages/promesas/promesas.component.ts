import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {



    this.contarTres().then(() => {
      console.warn('Promesa resuelta');
    })
    .catch (error => {
      console.error('Promesa rechazada ', error);
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<string> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      const intervalo  = setInterval( () => {
          contador += 1;
          console.log(contador);
          if (contador === 3) {
            clearInterval(intervalo);
            resolve('OK');
            // reject('Falló');
          }
      }, 1000);
    });
  }
}
