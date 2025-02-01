import { Component, OnInit } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { DetallesDestino } from '@services/DetallesDestino';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.css',
})
export class DestinoComponent {
  constructor(public destinoService: DestinoService, public detallesDestino : DetallesDestino) {}

  control: boolean = true;


  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.destino();
    }, 1000);
  }

  destino() {
    sessionStorage.getItem('destinoAmerica') === 'Bora Bora'
      ? (this.control = false)
      : (this.control = true);

    const id = parseInt(sessionStorage.getItem('destinoId') || '0');

    const ids = [(id *2-1).toString(), (id*2).toString()];

    

    const params = {
      destinoAmerica: sessionStorage.getItem('destinoAmerica') || '',
      destinoEuropa: sessionStorage.getItem('destinoEuropa') || '',
    };


    
    this.detallesDestino.getMultipleDetallesDestinos(ids)
        
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
    console.log("estos son los datos atrapados en filtrar destino.America: ",this.europa);
  }

  






}



