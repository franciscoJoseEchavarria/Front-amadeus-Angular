import {Injectable} from '@angular/core';
  import axios, { AxiosInstance } from 'axios';
import { Session } from 'inspector';
import { Observable, forkJoin } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  }
  )
  export class DetallesDestinoService {
    private apiURL = 'http://localhost:8081/api/detallesdestinos';
    private axiosClient: AxiosInstance;

  
    
    constructor() {
      this.axiosClient = axios.create({
        baseURL: this.apiURL,
      });
    }

    async getDetallesDestino(endpoint: string): Promise<any> {
      try {
        const fullUrl = `${this.apiURL}${endpoint}`;    
        console.log('Detalles DestinoService FullURl:', fullUrl);          
        const response = await this.axiosClient.get( endpoint);
        return response.data;
        console.log('Datos de la respuesta:', response.data);
      } catch (error) {
        console.error('Error', error);
        throw error;
      }
    }

    getMultipleDetallesDestinos(ids: string[]): Observable<any[]> {
      const respuesta = ids.map(id => {
        const endpoint = `/search/${id}`;
        return this.getDetallesDestino(endpoint);
      });
      return forkJoin(respuesta);
    }
}




    
