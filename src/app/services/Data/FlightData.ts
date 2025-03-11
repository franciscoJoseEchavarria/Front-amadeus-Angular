// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlightsResponse } from '../../pages/Response/FlightsResponse'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class FlightData {
  // Inicialmente no hay imagen (null)

  private flights= new BehaviorSubject<FlightsResponse[]>([]);

  flight$ = this.flights.asObservable();

setselected (flights: FlightsResponse[]): void {
  this.flights.next(flights);
}

}