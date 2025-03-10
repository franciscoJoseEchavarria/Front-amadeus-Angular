import { Component, OnInit,  ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { DetallesDestinoService } from '@services/DetallesDestinoService';
import { ActivatedRoute } from '@angular/router';
import {DetallesDestinoData } from '@services/Data/DetallesDestinoData';  // Importación del servicio compartido
import { isPlatformBrowser } from '@angular/common';
import { FlightsService } from '@services/flightsService';  // Importación del servicio compartido
import { HotelService } from '@services/hotelService';  // Importación del servicio compartido
import { Observable } from 'rxjs';
import { FlightData } from '@services/Data/FlightData'; // Import FlightData
import { HotelData } from '@services/Data/HotelData'; // Import HotelData
import {FlightsResponse} from '../Response/FlightsResponse'; // Import FlightResponse




@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css'],
})
export class DestinoComponent implements OnInit {
  constructor(public destinoService: DestinoService, public detallesDestinoService : DetallesDestinoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private destinoDataService: DetallesDestinoData,
    private flightService : FlightsService,
    private hotelService: HotelService,
    private hotelData: HotelData,
    private flightData: FlightData,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  

  control: boolean = true;


  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];

  ngOnInit(): void {
    // Lee el parámetro "id" de la ruta
    const destinoId = Number(this.route.snapshot.paramMap.get('id'));
    if (!destinoId) {
      console.error('No se encontró un destinoId válido en la URL');
      return;
    }
    this.obtenerDetalles(destinoId);
  }

  // se utiliza retries para pasa la información y darle un refres para que carguen los datos, se debe mejorar esto en el backend para que la informacion persista y se pueda realizar.

   obtenerDetalles(retries: number = 5): void {

    // Verificar que el código se ejecute en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('sessionStorage no está disponible en este entorno.');
      return;
    }
    
    // 1. Obtenemos el destinoId
    const destinoId = Number(sessionStorage.getItem('destinoId'));
    // 2. Validamos si es un id válido
    if (!destinoId) {
      console.error('No se encontró destinoId en sessionStorage');
      return;
    }
    // 3. Llamamos al servicio
    this.detallesDestinoService.getDetallesByDestinoId(destinoId)
      .subscribe(
        (response) => {
          if (response.length < 2) {
            console.warn('No hay suficientes detalles, reintentando...');
            if (retries > 0) {
              // Reintenta después de 1 segundo
              setTimeout(() => {
                this.obtenerDetalles(retries - 1);
              }, 1000);
            } else {
              console.error('No se pudieron obtener suficientes detalles después de varios intentos.');
            }
          } else {
            console.log('Detalles del destino:', response);
            // Procesamos y asignamos los datos a la variable destinos

            //tomamos el response y lo mapeamos para agregarle el continente
            this.destinos = response.map((detalle, index) => {
              if (index === 0) {
                return { ...detalle, continente: 'América' };
              } else if (index === 1) {
                return { ...detalle, continente: detalle.nombreDestino === 'Dubaí' ? 'Asia' : 'Europa' };
              }
              return detalle;
            });
        
            this.filtrarDestinos();
            
        
            this.cdr.detectChanges();

            
            this.createFlights();




            this.createHotel();

          }
        },
        (error) => {
          console.error('Error al obtener detalles:', error);
        }
      );

  }
  
  filtrarDestinos(): void {
    this.america = this.destinos.filter(
      (destino) => destino.continente === 'América'
    );
    this.europa = this.destinos.filter(
      (destino) => destino.continente === 'Europa' || destino.continente === 'Asia'
    );
  }


  // Método para actualizar la imagen seleccionada en el servicio compartido - se selecciona en HTML y lleva el resultado
  selectRegion(region: string): void {
    if (region === 'America' && this.america && this.america.length > 0) {
      this.destinoDataService.setSelectedImage(this.america[0].img);
      this.destinoDataService.setSelectedCity(this.america[0].nombreDestino);
      this.destinoDataService.setSelectedCountry(this.america[0].pais);
      this.destinoDataService.setSelectedUnmissablePlace(this.america[0].lugarImperdible);
      this.destinoDataService.setSelectedLanguage(this.america[0].idioma);
    } else if (region === 'Europe' && this.europa && this.europa.length > 0) {
      this.destinoDataService.setSelectedImage(this.europa[0].img);
      this.destinoDataService.setSelectedCity(this.europa[0].nombreDestino);
      this.destinoDataService.setSelectedCountry(this.europa[0].pais);
      this.destinoDataService.setSelectedUnmissablePlace(this.europa[0].lugarImperdible);
      this.destinoDataService.setSelectedLanguage(this.europa[0].idioma);
    }
  }


  createFlights (){
// Supongamos que tienes definidos nombreDestino y destinoId en el componente.
  // Estos pueden provenir, por ejemplo, de sessionStorage o de la ruta.
  
  console.log('estoy en Destino America:', this.america[0].nombreDestino);
  console.log('estoy en Destino Europa:', this.europa[0].nombreDestino);
  
  const nombreDestinoA = this.america[0].nombreDestino;  // O el valor que obtengas dinámicamente
  const nombreDestinoE = this.europa[0].nombreDestino;  // O el valor que obtengas dinámicamente
  const destinoId = Number(sessionStorage.getItem('destinoId'));
  // Llamamos al método createFlights del servicio de vuelos.
  this.flightService.createFlights(nombreDestinoA, destinoId).subscribe(
    (response) => {
      console.log('Vuelos creados exitosamente America:', response);
      this.flightData.setselectedAmerica(response.flightName, response.flightDescription, response.flightImg);
      // Aquí puedes realizar acciones adicionales, por ejemplo, almacenar la respuesta
      // o navegar a otra página.
    },
    (error) => {
      console.error('Error al crear los vuelos:', error);
    }
  );
  // Llamamos al método createFlights del servicio de vuelos.
  this.flightService.createFlights(nombreDestinoE, destinoId).subscribe(
    (response) => {
      console.log('Vuelos creados exitosamente europa:', response);
      // Aquí puedes realizar acciones adicionales, por ejemplo, almacenar la respuesta
      // o navegar a otra página.
    },
    (error) => {
      console.error('Error al crear los vuelos:', error);
    }
  );
  }

  createHotel(){

    const nombreDestinoA = this.america[0].nombreDestino;  // O el valor que obtengas dinámicamente
    const nombreDestinoE = this.europa[0].nombreDestino;  // O el valor que obtengas dinámicamente
    const destinoId = Number(sessionStorage.getItem('destinoId'));

    this.hotelService.createHotels(nombreDestinoA, destinoId).subscribe(
      (response) =>{
        console.log('Vuelos creados exitosamente America:', response);
      },
      (error) =>{
        console.error('Error al crear los vuelos:', error);
      });

      this.hotelService.createHotels(nombreDestinoE, destinoId).subscribe(
        (response) =>{
          console.log('Vuelos creados exitosamente America:', response);
        },
        (error) =>{
          console.error('Error al crear los vuelos:', error);
        });
  }
}



