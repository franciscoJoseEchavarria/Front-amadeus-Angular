import { Component, OnInit,  ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { DetallesDestinoService } from '@services/DetallesDestinoService';
import { ActivatedRoute } from '@angular/router';
import { DestinoDataService } from '@services/DestinoDataService';  // Importación del servicio compartido
import { isPlatformBrowser } from '@angular/common';


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
    private destinoDataService: DestinoDataService,  // Inyección del servicio compartido
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  control: boolean = true;


  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];

  ngOnInit(): void {
    // Lee el parámetro "id" de la ruta
    const destinoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Id del destino (desde ruta):', destinoId);

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


  // Método para actualizar la imagen seleccionada en el servicio compartido
  selectRegion(region: string): void {
    if (region === 'America' && this.america && this.america.length > 0) {
      this.destinoDataService.setSelectedImage(this.america[0].img);
    } else if (region === 'Europe' && this.europa && this.europa.length > 0) {
      this.destinoDataService.setSelectedImage(this.europa[0].img);
    }
  }
}



