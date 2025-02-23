// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinoDataService {
  // Inicialmente no hay imagen (null)

/*
BehaviorSubject

es una clase especial de Subject en RxJS que se utiliza para emitir y suscribirse a valores. A diferencia de un Subject regular, un BehaviorSubject requiere un valor inicial y siempre emite el valor más reciente a cualquier nuevo suscriptor.

Características de BehaviorSubject
Valor Inicial: Un BehaviorSubject requiere un valor inicial cuando se crea.
Emisión del Valor Más Reciente: Siempre emite el valor más reciente a cualquier nuevo suscriptor, incluso si ese valor se emitió antes de que el suscriptor se suscribiera.
Acceso al Valor Actual: Puedes acceder al valor actual del BehaviorSubject en cualquier momento usando la propiedad value.
*/

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