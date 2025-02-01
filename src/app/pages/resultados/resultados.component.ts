import { Component, importProvidersFrom } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { UserQueryService } from '@services/userQuery.service';
import { parse } from 'path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  
  constructor(public destinoService: DestinoService, 
    public userQueryService : UserQueryService,
    private router: Router) {}

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

  async enviarDestino() {

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

      
      
      /** 
       try {
        const success = await this.userService.createUser(this.nombre.value, this.correo.value, this.role);
        const userId = this.userService.getUserId();
        if (success !== null) {
          sessionStorage.setItem('userdata', JSON.stringify({
            userId: userId,
            nombre: this.nombre.value,
            correo: this.correo.value,
            role: this.role,
            }));
            this.router.navigate(['/tarjetas']);
            } 
            
            } catch (error) {
              console.error('Error al crear el usuario ', error);
              }
              }
              
              */
             
             //AQUUI EMPIEZA EL NUEVOI CÓDIGO 001
             
     // Verificar si todos los datos están presentes
     
     
     try{
       const responseUserQueryEntity = await this.userQueryService.createReport(userQuery);  
 
       if(responseUserQueryEntity !== null){
        sessionStorage.setItem('userQueryData', JSON.stringify({
          userQueryId: responseUserQueryEntity.id,
          query: userQuery.query,
          queryTime: userQuery.queryTime,
          environmentType1: userQuery.environmentType1,
          climateType2: userQuery.climateType2,
          accommodationType3: userQuery.accommodationType3,
          activityType4: userQuery.activityType4,
          stayDuration: userQuery.stayDuration,
          ageRange: userQuery.ageRange,
          user: userQuery.user,
        }));
       }

       const destino = {
         pDestino : this.Destino,
         pClima: this.Clima,
         pActividad: this.Actividad,
         pAlojamiento: this.Alojamiento,
         pDuracion: this.Viaje,
         pRangoEdad: this.Edad,
         user: {id: parsedData.userId},
         userQuerysModel: { id: responseUserQueryEntity.id }
        };

        console.log('Destino enviado:', JSON.stringify(destino));
      
          const destinoresponse =  await this.destinoService.sendDestinity('/create', destino);

            
            if (destinoresponse ){
              console.log('Destino creado con éxito:', destinoresponse);

            }else{
              console.error('Error al recibir datos de DestinoModel:', destinoresponse);
            }

              this.destinoService.destinoAmerica = destinoresponse.destinoAmerica;
              this.destinoService.destinoEuropa = destinoresponse.destinoEuropa;
              sessionStorage.setItem('destinoAmerica', destinoresponse.destinoAmerica);
              sessionStorage.setItem('destinoEuropa', destinoresponse.destinoEuropa);
              sessionStorage.setItem("destinoId", destinoresponse.id);
              console.log( "destino: " , destino);
              console.log('Destino A:', this.destinoService.destinoAmerica);
              console.log('Destino E:', this.destinoService.destinoEuropa);
              
            
                this.router.navigate(['/destino']);
        
          }
          catch (error) {
            console.error('Error al crear el reporte o destino:', error);
        }
    }
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

