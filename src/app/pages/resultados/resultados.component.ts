import { Component, importProvidersFrom } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { UserQueryService } from '@services/userQuery.service';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  constructor(public destinoService: DestinoService, public userQueryService : UserQueryService) {}

  destinoAmerica = '';
  destinoEuropa = '';
  
  Destino = this.destinoService.respuestasSer[0];
  // pNanInt = "Nacional";
  Clima = this.destinoService.respuestasSer[1];
  // pLluvia = "Clima seco";
  Actividad = this.destinoService.respuestasSer[2];
  // pGastronomia = "Comida Local";
  Alojamiento = this.destinoService.respuestasSer[3];
  // pCentroAfueras = "Centro de la Ciudad";
  Viaje  = this.destinoService.respuestasSer[4];
  // pDescanso = "1-2 días act.intensas";
  Edad = this.destinoService.respuestasSer[5];


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  volverAtras() {
    this.destinoService.indice = 5;
    this.destinoService.respuestasSer.pop();
  }

  enviarDestino() {

    const userData = sessionStorage.getItem('userdata'); 
    let parsedData: any = null;
    if (userData) { 
      parsedData = JSON.parse(userData); // Verifica si los datos están completos 
      if (parsedData.nombre && parsedData.correo && parsedData.role && parsedData.userId) { 
        console.log('Datos del usuario en resultadosComponent:', parsedData);
      } else { 
        console.error('Los datos del usuario están incompletos'); 
      } 
    } else { 
      console.error('No se encontraron datos del usuario en sessionStorage'); 
    }


      const userQuery = {
        query: 'tablaUserQuery',
        queryTime: this.formatDate (new Date()),
        environmentType1: this.destinoService.respuestasSer[0],
        climateType2: this.destinoService.respuestasSer[1],
        accommodationType3: this.destinoService.respuestasSer[2],
        activityType4: this.destinoService.respuestasSer[3],
        stayDuration: this.destinoService.respuestasSer[4],
        ageRange: this.Edad,
        user: {
          id: parsedData.userId,
          name: parsedData.nombre,
          email: parsedData.correo,
          role: parsedData.role,
        }
      }


      //AQUUI EMPIEZA EL NUEVOI CÓDIGO 001

   // Verificar si todos los datos están presentes
   if (this.areUserQueryDataComplete(userQuery)) {
    this.userQueryService.createReport(userQuery)
      .then((response) => {
        this.destinoService.destinoA = response.destinoA;
        this.destinoService.destinoE = response.destinoE;
        sessionStorage.setItem('destinoAmerica', response.destinoA);
        sessionStorage.setItem('destinoEuropa', response.destinoE);
        console.log('Destino A:', this.destinoService.destinoA);
        console.log('Destino E:', this.destinoService.destinoE);
      })
      .catch((error) => {
        console.error('Error al enviar destino:', error);
      });

    if (this.destinoService.destinoA == '') {
      this.destinoService.destinoA = 'Bora Bora';
      this.destinoService.destinoE = 'Dubái';
    }
  } else {
    console.error('Faltan datos en userQuery:', userQuery);
  }
  }


areUserQueryDataComplete(userQuery: any): boolean {
return userQuery.query &&
     userQuery.queryTime &&
     userQuery.environmentType1 &&
     userQuery.climateType2 &&
     userQuery.accommodationType3 &&
     userQuery.activityType4 &&
     userQuery.stayDuration &&
     userQuery.ageRange &&
     userQuery.user &&
     userQuery.user.id &&
     userQuery.user.name &&
     userQuery.user.email &&
     userQuery.user.role;
}




//AQUI TERMINA EL CÓDIGO 001



/**


      this.userQueryService.createReport(userQuery)
    
      // Llama al método `sendDestinity` del servicio `DestinoService`, enviando un objeto con las respuestas seleccionadas


/** ---> CÓDIGO ANTERIO PARA QUE FUNCIONE EL SERVICIO DE DESTINO
    this.destinoService
      .sendDestinity('userQueryController/create', {
        // Parámetros que se envían en el cuerpo de la solicitud POST
        pDestino: this.destinoService.respuestasSer[0],
        pClimatica: this.destinoService.respuestasSer[1],
        pActividad: this.destinoService.respuestasSer[2],
        pAlojamiento: this.destinoService.respuestasSer[3],
        dViaje: this.destinoService.respuestasSer[4],
        edad: this.destinoService.respuestasSer[5],
        userData : sessionStorage.getItem('userdata')
      }   
    )

*/

/**
      .then((response) => {
        this.destinoService.destinoA = response.destinoA;
        this.destinoService.destinoE = response.destinoE;
        sessionStorage.setItem('destinoAmerica', response.destinoA);
        sessionStorage.setItem('destinoEuropa', response.destinoE);
        console.log('Destino A:', this.destinoService.destinoA);
        console.log('Destino E:', this.destinoService.destinoE);
      })
      .catch((error) => {
        console.error('Error al enviar destino:', error);
      });

    if (this.destinoService.destinoA == '') {
      this.destinoService.destinoA = 'Bora Bora';
      this.destinoService.destinoE = 'Dubái';
    }
  }
}
*/

}