import { Component } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { DestinoDataService } from '@services/DestinoDataService';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {

  constructor(private destinoDataService: DestinoDataService
    , private destinoService: DestinoService
  ){}
  selectedImage: string | undefined; // Declaras la propiedad
  destinoId =sessionStorage.getItem('destinoId');
  destino = this.destinoService.destinoAmerica;
  srcA = this.destinoService.srcA;
  srcE = this.destinoService.srcE;

  ngOnInit(){
  this.destinoDataService.selectedImage$.subscribe((imageUrl) => {
    this.selectedImage = imageUrl;
    console.log("imagenen seleccionada", this.selectedImage);
  });
}

}
