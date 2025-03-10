// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightData {
  // Inicialmente no hay imagen (null)

  private nombreAmerica = new BehaviorSubject<string>("");
  private imagenAmerica = new BehaviorSubject<string>("");
  private descripcionAmerica = new BehaviorSubject<string>("");
  private nombreEuropa = new BehaviorSubject<string>("");
  private imagenEuropa = new BehaviorSubject<string>("");
  private descripcionEuropa = new BehaviorSubject<string>("");

nombreAmerica$ = this.nombreAmerica.asObservable();
imagenAmerica$ = this.imagenAmerica.asObservable();
descripcionAmerica$ = this.descripcionAmerica.asObservable();
nombreEuropa$ = this.nombreEuropa.asObservable();
imagenEuropa$ = this.imagenEuropa.asObservable();
descripcionEuropa$ = this.descripcionEuropa.asObservable();

setselectedAmerica (nombreAmerica: string, imagenAmerica: string, descripcionAmerica: string): void {
  this.nombreAmerica.next(nombreAmerica);
  this.imagenAmerica.next(imagenAmerica);
  this.descripcionAmerica.next(descripcionAmerica);
}

setselectedEuropa (nombreEuropa: string, imagenEuropa: string, descripcionEuropa: string): void {
    this.nombreEuropa.next(nombreEuropa);
    this.imagenEuropa.next(imagenEuropa);
    this.descripcionEuropa.next(descripcionEuropa);
}
}