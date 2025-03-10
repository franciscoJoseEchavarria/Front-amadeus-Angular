import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';
import { HotelResponse} from '../pages/Response/HotelResponse';



@Injectable({
    providedIn: 'root',
  }
  )

  export class HotelService {
    private apiUrl = 'http://localhost:8081/api/hotels';
    
  
    constructor(private http: HttpClient) {}

    createHotels(nombreDestino: string, destinoId: number): Observable<HotelResponse> {
      {
        const url = `${this.apiUrl}/create?nombreDestino=${encodeURIComponent(nombreDestino)}&destinoId=${destinoId}`;
        return this.http.post<HotelResponse>(url, {});
      }
    }

    getFlightAll(): Observable<HotelResponse> {
        return this.http.get<HotelResponse>(`${this.apiUrl}/list`);
        }
  }
