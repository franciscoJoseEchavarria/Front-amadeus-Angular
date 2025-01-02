import { Component } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {

  constructor(public destinoService: DestinoService){}

  destino = this.destinoService.destinoA;
  srcA = this.destinoService.srcA;
  srcE = this.destinoService.srcE;

  // destino = "Playa del Carmen";
  // srcA = "../../../assets/img/PlayaDelCarmen.jpg"



}
