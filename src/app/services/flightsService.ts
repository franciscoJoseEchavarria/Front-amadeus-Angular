import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';

interface FlightsResponse {
  // Define the properties of FlightsResponse here
}


@Injectable({
    providedIn: 'root',
  }
  )

  export class FlightsService {
    private apiUrl = 'http://localhost:8081/api/flights';
    
  
    constructor(private http: HttpClient) {}

    createFlights(nombreDestino: string, destinoId: number): Observable<FlightsResponse[]> {
        const requestBody = {nombreDestino, destinoId};
      return this.http.post<FlightsResponse[]>(`${this.apiUrl}/create`, requestBody);
    }


    getFlightAll(): Observable<FlightsResponse[]> {
        return this.http.get<FlightsResponse[]>(`${this.apiUrl}/list`);
        }
  }