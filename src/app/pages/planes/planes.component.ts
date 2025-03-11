import { Component } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { DetallesDestinoData } from '@services/Data/DetallesDestinoData';
import { HotelData } from '@services/Data/HotelData'; // Add this line to import HotelData
import { FlightData } from '@services/Data/FlightData'; // Add this line to import FlightData
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import {HotelResponse} from '../../pages/Response/HotelResponse'; // Add this line to import HotelResponse
import {FlightsResponse} from '../../pages/Response/FlightsResponse'; // Add this line to import FlightsResponse


@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {
  constructor(
    private destinoDataService: DetallesDestinoData,
    private destinoService: DestinoService,
    private hotelData: HotelData,
    private flightData: FlightData,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}


  Hotel: HotelResponse [] = []; // Add this line to declare HotelAmerica
  Flight: FlightsResponse [] = []; // Add this line to declare FlightAmerica
 
 
  selectedUnmissablePlace: string | undefined; // Contenedor del lugar imperdible seleccionado
  selectedLanguage: string | undefined; // Contenedor del idioma seleccionado
  selectedCountry: string | undefined; // Contenedor del país seleccionado
  selectedImage: string | undefined; // Declaras la propiedad y seleccion la imagen que se va a mostrar
  selectedCity: string | undefined; // Contenedro de la ciudad seleccionada
  destinoId : number | null = null;
  destino = this.destinoService.destinoAmerica;
  detallesDestinoId: number | null = null;

  


  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      // Ahora es seguro usar sessionStorage
      this.destinoId = Number(sessionStorage.getItem('destinoId'));
      // ...
    } else {
      console.warn('sessionStorage no está disponible en este entorno.');
    }

    this.destinoDataService.selectedId$.subscribe((id) => {
      this.detallesDestinoId = id;
      console.log("id seleccionado detallesDestino", this.detallesDestinoId);
    });
    
    this.destinoDataService.selelectedUnmissablePlace$.subscribe((unmissablePlace) => {
      this.selectedUnmissablePlace = unmissablePlace;
      console.log("lugar imperdible seleccionado", this.selectedUnmissablePlace);
    });

    this.destinoDataService.selectedLagunage$.subscribe((language) => {
      this.selectedLanguage = language;
      console.log("idioma seleccionado", this.selectedLanguage);
    });

    this.destinoDataService.selectecCountry$.subscribe((country) => {
      this.selectedCountry = country;
      console.log("país seleccionado", this.selectedCountry);
    });

    this.destinoDataService.selectedImage$.subscribe((imageUrl) => {
      this.selectedImage = imageUrl;
      console.log("imagenen seleccionada", this.selectedImage);
    });

    this.destinoDataService.selectedCity$.subscribe((city) => {
      this.selectedCity = city;
      console.log("ciudad seleccionada", this.selectedCity);
    });

    this.hotelData.hoteles$.subscribe((hoteles) => {
      this.Hotel = hoteles;
      console.log("hoteles de america", this.Hotel);
    });

    this.flightData.flight$.subscribe((flights) => {
      this.Flight = flights;
      console.log("vuelos de america", this.Flight);
    });

  }// Fin ngOnInit
}
