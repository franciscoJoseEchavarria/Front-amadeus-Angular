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
export class DestinoComponent implements OnInit {
  constructor(public destinoService: DestinoService, public detallesDestinoService : DetallesDestinoService,
    private cdr: ChangeDetectorRef
  ) {}

  control: boolean = true;


  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];

  ngOnInit(): void {
      this.obtenerDetalles();
  }


  // se utiliza retries para pasa la información y darle un refres para que carguen los datos, se debe mejorar esto en el backend para que la informacion persista y se pueda realizar.
  obtenerDetalles(retries: number = 5): void {
    // 1. Obtenemos el destinoId
    const destinoId = Number(sessionStorage.getItem('destinoId'));
    console.log('Id del destino:', destinoId);
  
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
            this.destinos = response.map((detalle, index) => {
              if (index === 0) {
                return { ...detalle, continente: 'América' };
              } else if (index === 1) {
                return { ...detalle, continente: detalle.nombreDestino === 'Dubaí' ? 'Asia' : 'Europa' };
              }
              return detalle;
            });
            // Llamamos a filtrarDestinos para separar en america y europa/asia
            this.filtrarDestinos();
            this.cdr.detectChanges();
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
    console.log('América:', this.america);
    console.log('Europa o Asia:', this.europa);
  }
}



