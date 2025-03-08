  import {Injectable} from '@angular/core';
  import axios, { AxiosInstance } from 'axios';
import { Session } from 'inspector';

  @Injectable({
    providedIn: 'root',
  }
  )
  export class DestinoService {
    private apiURL = 'http://localhost:8081/api/destinos';
    private axiosClient: AxiosInstance;

  
    
    constructor() {
      this.axiosClient = axios.create({
        baseURL: this.apiURL,
      });
    }
    /**
     * Este método realiza una solicitud HTTP POST a un endpoint determinado, enviando los datos proporcionados en el cuerpo de la solicitud.
     * Tras la respuesta, se recibe los posibles destinos, que se devuelve como parte de los datos de la respuesta.
     * Si ocurre un error durante la solicitud, se lanza una excepción.
     *
     * @param {string} endpoint - El endpoint al que se realizará la solicitud POST.
     * @param {any} data - Los datos que se enviarán en el cuerpo de la solicitud.
     * @returns {Promise<any>} Una promesa que se resuelve con los datos de la respuesta del servidor.
     * @throws {Error} Si ocurre un problema durante la solicitud, como errores de red o del servidor.
     *
     * @example
     * try {
     *   const data = await this.sendDestinity('/api/endpoint', { key: 'value' });
     *   console.log(data);
     * } catch (error) {
     *   console.error('Error al enviar los datos', error);
     * }
     */





    async sendDestinity(endpoint: string, data: any): Promise<any> {
      try {
        const fullURL = `${this.apiURL}${endpoint}`;;
        const response = await this.axiosClient.post(fullURL, data);
        return response.data;
      } catch (error) {
        console.error('Error', error);
        throw error;
      }
    }

    /**
     * Este método realiza una solicitud HTTP GET a un endpoint determinado y devuelve la respuesta del servidor.
     * Si ocurre un error durante la solicitud, se lanza una excepción.
     *
     * @param {string} endpoint - El endpoint al que se realizará la solicitud GET.
     * @returns {Promise<any>} Una promesa que se resuelve con los datos de la respuesta del servidor.
     * @throws {Error} Si ocurre un problema durante la solicitud, como errores de red o del servidor.
     *
     * @example
     * try {
     *   const data = await this.getDestinity('/api/endpoint/nameDestinity1/nameDestinity2');
     *   console.log(data);
     * } catch (error) {
     *   console.error('Error al obtener los datos', error);
     * }
     */


    async getDestinity(endpoint: string, params: {destinoAmerica : string , destinoEuropa: string }  ): Promise<any> {
      try {
        const fullUrl = `${this.apiURL}${endpoint}`;
        const response = await this.axiosClient.get( endpoint, { params } );
        return response.data;
      } catch (error) {
        console.error('Error', error);
        throw error;
      }
    }

    indice: number = 0;
    destinoAmerica: String = '';
    destinoEuropa: String = '';
    respuestasSer: String[] = [];
    nombreS: String = '';
    correoS: String = '';
    avatar: String = 'https://cdn-icons-png.flaticon.com/512/9187/9187532.png';
    srcA: String = '';
    srcE: String = '';
    roleS: String = '';
    userId: number = 0;
    
    
  }
