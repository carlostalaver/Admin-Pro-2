import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  datosRuta: Data;

  constructor(private route: Router, private title: Title, private meta: Meta) {
    this.getDataRoute()
    .subscribe( (event) => {
      this.datosRuta = event;
      this.title.setTitle(event.titulo);

      const metaTag: MetaDefinition = {
        name: 'Description',
        content: this.datosRuta.titulo,
      };
      
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute(): Observable<Data> {
    return this.route.events
    .pipe(
      filter( event  => event instanceof ActivationEnd),
      filter ((event: ActivationEnd) => {
        return event.snapshot.data.titulo;
      }),
      map((event: ActivationEnd ) => {
         return event.snapshot.data;
      })
    );
  }
}
