// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HotelResponse} from '../../pages/Response/HotelResponse';

@Injectable({
  providedIn: 'root'
})
export class HotelData {

    //contenido de los hoteles
  private hoteles = new BehaviorSubject<HotelResponse[]>([]);
  

// extrae los datos para ser pintarlos en la vista  
hoteles$ = this.hoteles.asObservable();

//metodo para setear los datos
setSelected(hoteles: HotelResponse[]): void {
  this.hoteles.next(hoteles);
};


}
