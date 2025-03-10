import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';

import { FlightsResponse} from '../pages/Response/FlightsResponse';


@Injectable({
    providedIn: 'root',
  }
  )

  export class FlightsService {
    private apiUrl = 'http://localhost:8081/api/flights';
    
  
    constructor(private http: HttpClient) {}

    createFlights(nombreDestino: string, destinoId: number): Observable<FlightsResponse> {
      const url = `${this.apiUrl}/create?nombreDestino=${encodeURIComponent(nombreDestino)}&destinoId=${destinoId}`;
      return this.http.post<FlightsResponse>(url, {});
    }


    getFlightAll(): Observable<FlightsResponse[]> {
        return this.http.get<FlightsResponse[]>(`${this.apiUrl}/list`);
        }
  }