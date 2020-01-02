import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre-leyenda') public leyenda: string = 'Leyenda';
  @Input() public progreso: number = 95;
  @Output() public cambioValor: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('txtProgress', {static: true}) txtProgress: ElementRef;

  constructor() {
   }

  ngOnInit() {
    this.txtProgress.nativeElement.focus();
  }

  cambiarValor(value: number): void {
    if (this.progreso >= 100 && value > 0) {
        this.progreso = this.progreso;
        return;
    }
    if (this.progreso <= 0 && value < 0) {
      this.progreso = this.progreso;
      return;
    }
    this.progreso = this.progreso + (value);
    this.cambioValor.emit(this.progreso);
  }

  onChanges(valorEvent: number) { /* onChanges solo se dispara cuando cambia el ngModel progress desde el input */
    if (valorEvent >= 100) {
      this.progreso = 100;
    } else if (valorEvent <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valorEvent;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.txtProgress.nativeElement.focus();
    this.cambioValor.emit(this.progreso);
  }
}
