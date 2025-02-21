import { Component, OnInit,  ChangeDetectorRef } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { DetallesDestinoService } from '@services/DetallesDestinoService';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.css',
})
export class DestinoComponent {
  constructor(public destinoService: DestinoService, public detallesDestinoService : DetallesDestinoService,
    private cdr: ChangeDetectorRef
  ) {}

  control: boolean = true;


  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];

  ngOnInit(): void {
      this.destino();
  }

  async destino() {

    console.log("aqui se imprime console log de prueba",sessionStorage.getItem('destinoAmerica'));

    sessionStorage.getItem('destinoAmerica') === 'Bora Bora'
      ? (this.control = false)
      : (this.control = true);
     
    const id = parseInt(sessionStorage.getItem('destinoId') || '0');
    console.log('Id del destino:', id);
   
    this.detallesDestinoService.getDetallesByDestinoId(id)
    .subscribe((response) => {        
        console.log('Respuesta de getMultipleDestino', response);
        this.destinos = [
          { nombreDestino: response[0].nombreDestino, img: response[0].img, pais: response[0].pais, 
            idioma: response[0].idioma, lugarImperdible: response[0].lugarImperdible, continente: 'América' },
          { 
            nombreDestino: response[1].nombreDestino, img: response[1].img, pais: response[1].pais, 
            idioma: response[1].idioma, lugarImperdible: response[1].lugarImperdible, 
            continente: response[1].nombreDestino === "Dubaí" ? 'Asia' : 'Europa'
          }
        ];
        this.filtrarDestinos();
        console.log(this.filtrarDestinos());
        this.cdr.detectChanges(); // Forzar la detección de cambios
        
      }),
      (error: any) => {
        console.error('Error', error);
      };
  }

  filtrarDestinos(): void {
    this.america = this.destinos.filter(
      (destino) => destino.continente === 'América'
    );
    this.europa = this.destinos.filter(
      (destino) =>
        destino.continente === 'Europa' || destino.continente === 'Asia'
    );
    console.log("estos son los datos atrapados en filtrar destino.America: ",this.america);
    console.log("estos son los datos atrapados en filtrar destino.europa: ",this.europa);
  }
}



