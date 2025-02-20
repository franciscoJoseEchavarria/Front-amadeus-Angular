import {Injectable} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  }
  )
  export class DetallesDestinoService {
    private apiURL = 'http://localhost:8081/api/detallesdestinos';


  
    
    constructor(private http: HttpClient) {
 
    }

    getDetallesDestino(endpoint: string): Observable<any> {
      return this.http.get(`${this.apiURL}${endpoint}`);
    }
  
    getMultipleDetallesDestinos(ids: string[]): Observable<any[]> {
      const respuesta = ids.map(id => {
        const endpoint = `/search/${id}`;
        return this.getDetallesDestino(endpoint);
      });
      return forkJoin(respuesta);
    }
}




    
