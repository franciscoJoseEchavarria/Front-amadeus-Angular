// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinoDataService {
  // Inicialmente no hay imagen (null)
  private selectedImageSource = new BehaviorSubject<string>("");
  // Se expone el observable para que otros componentes se puedan suscribir
  selectedImage$ = this.selectedImageSource.asObservable();

  // Método para actualizar la imagen seleccionada
  setSelectedImage(imageUrl: string): void {
    this.selectedImageSource.next(imageUrl);
  }
}

//BehaviorSubject: Es un tipo de Observable que almacena el último valor emitido y lo reenvía a cada nuevo suscriptor.
//selectedImage$: Es el observable que otros componentes pueden suscribir para //recibir actualizaciones de la imagen seleccionada.
//setSelectedImage(): Permite actualizar la imagen en el servicio.