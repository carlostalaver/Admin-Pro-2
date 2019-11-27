import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducto, IDetalleProducto } from '../interfaces/info-pagina-interface';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: IProducto[] = [];
  productosFiltrados: IProducto[] = null;

  constructor(private http: HttpClient) {
    this.cargarProducto().then(() => {
      console.log('promesa resuelta ', this.productos);
    });
  }

  private cargarProducto(): Promise<void> {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-abc32.firebaseio.com/productos_idx.json')
        .subscribe((resp: IProducto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProductId(id: string): Observable<IDetalleProducto> {
    return this.http.get(`https://angular-html-abc32.firebaseio.com/productos/${id}.json`) as Observable<IDetalleProducto>;
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProducto().then(() => {
        this.filtarProducto(termino); // di no tengo datos en this.productos espera a que los haya para poder ejecutar this.filtrarProducto
      });
    } else {
      this.filtarProducto(termino);
    }
  }

  /* Se ejecutará si y solo si this.producto tiene productos*/
  private filtarProducto(termino: string) {
    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();
    if (termino) {
      this.productosFiltrados = this.productos.filter(p => {
        return (p.categoria.toLocaleLowerCase().indexOf(termino) >= 0 || p.titulo.toLocaleLowerCase().indexOf(termino) >= 0);
      });
    } else {
      this.productosFiltrados = this.productos;
    }
    console.log(' filtrados', this.productosFiltrados);
  }
}
