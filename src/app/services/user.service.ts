import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:8081/api/user';

  // Método asíncrono para crear un nuevo usuario con nombre y email.
  async createUser(name: string, email: string): Promise<boolean> {
    // Imprime en la consola el nombre y email del usuario que se está creando.
    console.log('Creando usuario con nombre:', name, 'y email:', email);
    try {
      // Realiza una petición POST a la API para crear un nuevo usuario.
      const response = await axios.post(`${this.apiURL}/create`, {
        name,
        email,
        role: 'user',
      });

      // Si la creación es exitosa, devuelve true.
      if (response.status === 200) {
        return true;
      } else {
        console.error('Error en la creación de usuario');
        return false;
      }
    } catch (error) {
      // Maneja errores específicos de axios.
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          alert('El usuario ya existe: Ir e iniciar sesión');
        } else {
          console.error('Error en la creación de usuario', error);
        }
      } else {
        // Maneja errores inesperados.
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