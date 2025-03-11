// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallesDestinoData {
  // Inicialmente no hay imagen (null)

/*
BehaviorSubject

es una clase especial de Subject en RxJS que se utiliza para emitir y suscribirse a valores. A diferencia de un Subject regular, un BehaviorSubject requiere un valor inicial y siempre emite el valor más reciente a cualquier nuevo suscriptor.

Características de BehaviorSubject
Valor Inicial: Un BehaviorSubject requiere un valor inicial cuando se crea.
Emisión del Valor Más Reciente: Siempre emite el valor más reciente a cualquier nuevo suscriptor, incluso si ese valor se emitió antes de que el suscriptor se suscribiera.
Acceso al Valor Actual: Puedes acceder al valor actual del BehaviorSubject en cualquier momento usando la propiedad value.
*/
  private selectedId = new BehaviorSubject<number>(0);
  private selectedUnmissablePlace = new BehaviorSubject<string>("");
  private selectecLanguageSource = new BehaviorSubject<string>("");
  private selectecCountrySource = new BehaviorSubject<string>("");
  private selectedCitySource = new BehaviorSubject<string>("");
  private selectedImageSource = new BehaviorSubject<string>("");
  // Se expone el observable para que otros componentes se puedan suscribir
  
  // se declaran como observables para que otros componentes puedan suscribirse a ellas y recibir actualizaciones en tiempo real cuando los valores cambien.
  selectedId$ = this.selectedId.asObservable();
  selelectedUnmissablePlace$ = this.selectedUnmissablePlace.asObservable();
  selectedLagunage$ = this.selectecLanguageSource.asObservable();
  selectecCountry$ = this.selectecCountrySource.asObservable();
  selectedCity$ = this.selectedCitySource.asObservable();
  selectedImage$ = this.selectedImageSource.asObservable();

  // Método para actualizar el id
  setSelectedId(id: number): void {
    this.selectedId.next(id);
  }

  setSelectedUnmissablePlace(unmissablePlace: string): void {
    this.selectedUnmissablePlace.next(unmissablePlace);
  }

  // Método para actualizar el idioma
  setSelectedLanguage(language: string): void{
    this.selectecLanguageSource.next(language)
  }

  // Método para actualizar el país
  setSelectedCountry(country: string): void {
    this.selectecCountrySource.next(country);
  }

  // Método para actualizar la ciudad
  setSelectedCity(city: string): void {
  this.selectedCitySource.next(city);
  }

  // Método para actualizar la imagen seleccionada
  setSelectedImage(imageUrl: string): void {
    this.selectedImageSource.next(imageUrl);
  }
}

//BehaviorSubject: Es un tipo de Observable que almacena el último valor emitido y lo reenvía a cada nuevo suscriptor.
//selectedImage$: Es el observable que otros componentes pueden suscribir para //recibir actualizaciones de la imagen seleccionada.
//setSelectedImage(): Permite actualizar la imagen en el servicio.