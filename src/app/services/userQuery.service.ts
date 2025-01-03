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

  async createUser(userQuery: {
    query: string;
    queryTime: string;
    environmentType1: string;
    climateType2: string;
    accommodationType3: string;
    activityType4: string;
    stayDuration: string;
    ageRange: string;
    user: any;
  }): Promise<boolean> {
    console.log('Creando usuario con datos:', userQuery);
    try {
      const response = await this.axiosClient.post('/create', userQuery);

      if (response.status === 200) {
        return true;
      } else {
        console.error('Error en la creación de usuario');
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          alert('El usuario ya existe: Ir e iniciar sesión');
        } else {
          console.error('Error en la creación de usuario', error);
        }
      } else {
        console.error('Se ha producido un error inesperado', error);
      }
      return false;
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