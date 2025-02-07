// Importamos cosas necesarias de Angular
import { Component, OnInit, QueryList, ViewChild, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Decorador que define este archivo como un componente de Angular
@Component({
  selector: 'app-perfil-autentificacion', // Nombre del componente que se usará en el HTML
  standalone: true, // Indica que este componente puede funcionar por sí solo
  templateUrl: './perfil-autentificacion.component.html', // Archivo HTML asociado a este componente
  styleUrls: ['./perfil-autentificacion.component.css'], // Archivo CSS asociado a este componente
  imports: [CommonModule] // Importa módulos necesarios; sirve para utiliza los ng if, ng for, etc.
})


export class PerfilAutentificacionComponent implements OnInit, AfterViewInit {
  @ViewChildren("slidesElements") slidesElements!: QueryList<ElementRef>; // Elementos de las diapositivas
  @ViewChildren("dotElement") dotElements!: QueryList<ElementRef>; // Elementos de los puntos de navegación

  DiaposivaCurrenSlide: number =1;

  selectedRole: string = 'usuario'; // Variable que almacena el rol seleccionado

  diapositivaUserOAdmin: number = 0; // Variable que almacena el índice de las diapositivas
  diapositiva: number = 1; // Índice de las diapositivas
  
  usuarioimages: String [] = [ "../../../assets/img/img-avatar/ava11.png", 
    "../../../assets/img/img-avatar/ava12.png",
    "../../../assets/img/img-avatar/ava13.png",
    "../../../assets/img/img-avatar/ava14.png"]
    
    administrativoimages: String[] = ["../../../assets/img/img-avatar/ava21.png",
      "../../../assets/img/img-avatar/ava22.png",
      "../../../assets/img/img-avatar/ava23.png",
      "../../../assets/img/img-avatar/ava24.png"]
      
      dots: number[] = [1, 2, 3, 4];
      
      constructor() { }
    
      // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {      
  }

  ngAfterViewInit() { 
    this.SelecciónTipoUserAdministrativo();
   
  }

//Asina el cambio de diapostiva de acuerdo a los botones
  btnCambioUA(role: string): void {
    this.selectedRole = role; // Asignamos el rol seleccionado a la variable
     // Reiniciamos el índice de las diapositivas
    setTimeout(()=>this.SelecciónTipoUserAdministrativo(),0)
  }

  currentSlide(n: number): void {
    this.diapositiva = n;
    this.SelecciónTipoUserAdministrativo();
  }

  
  //Seleccion de tipo de usuario
  SelecciónTipoUserAdministrativo(): void {
    // Verifica si `slidesElements` no es `null` o `undefined`
    if (this.slidesElements) {
      // Itera sobre cada elemento en `slidesElements`
      this.slidesElements.forEach((element, index) => {
        // Obtiene el elemento del DOM real
        const imgElement = element.nativeElement as HTMLElement;
        // Si el índice del elemento coincide con el índice de la diapositiva actual, muestra la imagen
        if (index === this.diapositiva - 1) {
          imgElement.style.display = "block";
        } else {
          // Si no coincide, oculta la imagen
          imgElement.style.display = "none";
        }
      });
      this.actualizarPuntos();
    }
  }

  // Actualizar puntos
  actualizarPuntos(): void {
    const puntos = this.dotElements.toArray();
    puntos.forEach((punto, index) => {
      if (index === this.diapositiva - 1) {
        punto.nativeElement.classList.add('active');

      } else {
        punto.nativeElement.classList.remove('active');
      }
    });
  }

  diapositivaSiguiente(){
    if(this.diapositiva<4){
      this.diapositiva++
    }else{
      this.diapositiva=1;
    }
    this.SelecciónTipoUserAdministrativo();
  }

  diapositivaAtras(){
    if(this.diapositiva>1){
      this.diapositiva--
    }else{
        this.diapositiva=4;
    }
    this.SelecciónTipoUserAdministrativo()
  }

}
