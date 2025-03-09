import {Injectable} from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';
import { DetallesDestinosResponse } from '../pages/Models/DetallesDestinoResponse';

  @Injectable({
    providedIn: 'root',
  }
  )
  export class DetallesDestinoService {
    private baseUrl = 'http://localhost:8081/api/detallesdestinos';
    
  
    constructor(private http: HttpClient) {}


    getDetallesByDestinoId(destinoId: number): Observable<DetallesDestinosResponse[]> {
      return this.http.get<DetallesDestinosResponse[]>(`${this.baseUrl}/destino/${destinoId}`);
    }
}




    
