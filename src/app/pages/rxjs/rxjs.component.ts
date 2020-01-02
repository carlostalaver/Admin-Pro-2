import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  objSubscripcion: Subscription;

  constructor() {

   this.objSubscripcion =  this.regresaObservable()
      .pipe(
        retry(2)
      )
      .subscribe((value) => {
        console.log(value);
      }
        , null
        , () => {
          console.warn('Secuencia completada...!');
        });

  }

  ngOnInit() {
  }

  regresaObservable(): Observable<unknown> {
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };
        observer.next(salida);
/*         if (contador === 3) {
          observer.complete();
          clearInterval(intervalo);
        } */

      }, 1000);
    }).pipe(
      map((value: any, index) =>  value.valor + 1),
      filter((value, index) => value % 2 === 1 ? true : false)
    );
  }

  ngOnDestroy(): void {
    this.objSubscripcion.unsubscribe();
  }

}
