import { Component } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { DestinoDataService } from '@services/DestinoDataService';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {

  constructor(private destinoDataService: DestinoDataService
    , private destinoService: DestinoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}
  selectedImage: string | undefined; // Declaras la propiedad y seleccion la imagen que se va a mostrar
  selectedCity: string | undefined; // Contenedro de la ciudad seleccionada
  destinoId =sessionStorage.getItem('destinoId'); // session storage de destinoID
  destino = this.destinoService.destinoAmerica;


  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      // Ahora es seguro usar sessionStorage
      const destinoId = Number(sessionStorage.getItem('destinoId'));
      // ...
    } else {
      console.warn('sessionStorage no está disponible en este entorno.');
    }
  this.destinoDataService.selectedImage$.subscribe((imageUrl) => {
    this.selectedImage = imageUrl;
    console.log("imagenen seleccionada", this.selectedImage);
  });

  this.destinoDataService.selectedCity$.subscribe((city) => {
    this.selectedCity = city;
    console.log("ciudad seleccionada", this.selectedCity);
  });


}
}
