import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';

interface HotelResponse {
  // Define the properties of FlightsResponse here
}


@Injectable({
    providedIn: 'root',
  }
  )

  export class HotelService {
    private apiUrl = 'http://localhost:8081/api/hotels';
    
  
    constructor(private http: HttpClient) {}

    createFlights(nombreDestino: string, destinoId: number): Observable<HotelResponse[]> {
        const requestBody = {nombreDestino, destinoId};
      return this.http.post<HotelResponse[]>(`${this.apiUrl}/create`, requestBody);
    }

    getFlightAll(): Observable<HotelResponse[]> {
        return this.http.get<HotelResponse[]>(`${this.apiUrl}/list`);
        }
  }
