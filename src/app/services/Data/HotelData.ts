// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelData {

    //contenido de los hoteles
  private hNombreAmerica = new BehaviorSubject<string>("");
  private hImagenAmerica = new BehaviorSubject<string>("");
  private hDescripcionAmerica = new BehaviorSubject<string>("");
  private hNombreEuropa = new BehaviorSubject<string>("");
  private hImagenEuropa = new BehaviorSubject<string>("");
  private hDescripcionEuropa = new BehaviorSubject<string>("");


// extrae los datos para ser pintarlos en la vista  
nombreAmerica$ = this.hNombreAmerica.asObservable();
imagenAmerica$ = this.hImagenAmerica.asObservable();
descripcionAmerica$ = this.hDescripcionAmerica.asObservable();
nombreEuropa$ = this.hNombreEuropa.asObservable();
imagenEuropa$ = this.hImagenEuropa.asObservable();
descripcionEuropa$ = this.hDescripcionEuropa.asObservable();


//metodo para setear los datos
setselectedAmerica (hnombreAmerica: string, himagenAmerica: string, hdescripcionAmerica: string): void {
  this.hNombreAmerica.next(hnombreAmerica);
  this.hImagenAmerica.next(himagenAmerica);
  this.hDescripcionAmerica.next(hdescripcionAmerica);

}

setselectedEuropa (hnombreEuropa: string, himagenEuropa: string, hdescripcionEuropa: string): void {
    this.hNombreEuropa.next(hnombreEuropa);
    this.hImagenEuropa.next(himagenEuropa);
    this.hDescripcionEuropa.next(hdescripcionEuropa);
}

}