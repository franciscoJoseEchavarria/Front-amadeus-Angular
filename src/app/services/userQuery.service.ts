import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserQueryService {
  private apiURL = 'http://localhost:8081/api/userQueryController';
  private axiosClient: AxiosInstance;



  constructor() {
    this.axiosClient = axios.create({
      baseURL: this.apiURL,
    });
  }

  async createReport(queryData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiURL}/create`, queryData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      throw error;
    }
  }
  // Método asíncrono para obtener un usuario por ID.
  async getUserById(id: number): Promise<any> {
    try {
      // Realiza una solicitud HTTP GET al endpoint '/user/{id}' para obtener los datos del usuario con el ID especificado.
      const response = await axios.get(`${this.apiURL}/${id}`);
      // Si la solicitud es exitosa, devuelve los datos de la respuesta del servidor.
      return response.data;
    } catch (error) {
      // Si ocurre un error durante la solicitud, imprime un mensaje de error en la consola.
      console.error('Error', error);

      // Lanza el error para que pueda ser manejado por el código que llama a este método.
      throw error;
    }
  }


}