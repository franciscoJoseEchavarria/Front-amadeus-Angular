// Importamos los módulos y servicios necesarios de Angular y otros archivos
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DestinoService } from '@services/destino.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

/**
 * Enumeración de imágenes de avatar para seleccionar una imagen de avatar
 * en el componente PerfilComponent. Esto nos permite seleccionar una imagen
 * de avatar de forma más sencilla y segura. Ademas, si se desea hacer cambios
 * en las imágenes de avatar, solo se debe modificar el enum AvatarImages.
 */
enum AvatarImages {
  AVATAR1 = 'assets/img/img-avatar/ava11.png',
  AVATAR2 = 'assets/img/img-avatar/ava12.png',
  AVATAR3 = 'assets/img/img-avatar/ava13.png',
  AVATAR4 = 'assets/img/img-avatar/ava14.png',
}

// Decorador que define este archivo como un componente de Angular
@Component({
  selector: 'app-perfil', // Nombre del componente que se usará en el HTML
  standalone: true, // Indica que este componente puede funcionar por sí solo
  imports: [RouterLink, ReactiveFormsModule], // Importa módulos necesarios
  templateUrl: './perfil.component.html', // Archivo HTML asociado a este componente
  styleUrl: './perfil.component.css' // Archivo CSS asociado a este componente
})
export class PerfilComponent implements AfterViewInit {
  // Seleccionar elementos del DOM con @ViewChildren para evitar manipulación directa del DOM
  @ViewChildren('slidesElements') slidesElements!: QueryList<ElementRef>;
  @ViewChildren('dotElement') dotElemets!: QueryList<ElementRef>;

  // Constructor que se usa para inicializar cosas
  constructor(
    public destinoService: DestinoService,
    private userService: UserService,
    private router: Router
  ) {}

  // Variables para manejar el estado del correo y el control del botón
  estadoCorreo = "";
  controlBoton = true;

  // Variable para manejar el índice de las diapositivas
  slideIndex: number = 1;

  // Variables para manejar los campos del formulario
  nombre = new FormControl();
  correo = new FormControl();
  role = "user";

  // ngAfterViewInit se ejecuta después de que Angular haya inicializado las vistas del componente
  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  // Método para avanzar o retroceder en las diapositivas
  plusSlides(n: number): void {
    this.showSlides(this.slideIndex += n);
  }

  // Método para mostrar una diapositiva específica
  currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  // Método para mostrar las diapositivas
  showSlides(n: number): void {
    /**
     * Convertir QueryList en un array para poder iterar sobre cada elemento del DOM,
     * en este caso los slides y los dots.
     */
    const slides = this.slidesElements.toArray();
    const dots = this.dotElemets.toArray();

    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    slides.forEach((slide) => {
      slide.nativeElement.style.display = 'none';
    });

    dots.forEach((dot) => {
      dot.nativeElement.className = dot.nativeElement.className.replace(
        ' active',
        ''
      );
    });

    slides[this.slideIndex - 1].nativeElement.style.display = 'block';
    dots[this.slideIndex - 1].nativeElement.className += ' active';
  }

  // Método para manejar los datos del usuario
  async datosUsuario() {
    // Asignar valores a las propiedades del servicio destinoService
    this.destinoService.nombreS = this.nombre.value;
    this.destinoService.correoS = this.correo.value;
    this.destinoService.roleS = this.role;

    // Asignar la imagen de avatar según el índice de la diapositiva
    switch (this.slideIndex) {
      case 1: {
        this.destinoService.avatar = AvatarImages.AVATAR1;
        break;
      }
      case 2: {
        this.destinoService.avatar = AvatarImages.AVATAR2;
        break;
      }
      case 3: {
        this.destinoService.avatar = AvatarImages.AVATAR3;
        break;
      }
      case 4: {
        this.destinoService.avatar = AvatarImages.AVATAR4;
        break;
      }
    }

    
    // Intentar crear un nuevo usuario
    try {
      const success = await this.userService.createUser(
        this.nombre.value,
        this.correo.value,
        this.role
      );
      const userId = this.userService.getUserId();
      if (success !== null) {
        // Guardar los datos del usuario en sessionStorage
        sessionStorage.setItem(
          'userdata',
          JSON.stringify({
            userId: userId,
            nombre: this.nombre.value,
            correo: this.correo.value,
            role: this.role,
          })
        );
        // Navegar a la página de tarjetas
        this.router.navigate(['/tarjetas']);
      }
    } catch (error) {
      console.error('Error al crear el usuario ', error);
    }
  }

  // Método para verificar el nombre del usuario
  verificarNomb(event: Event) {
    let nomUsuario = this.nombre.value;

    if (nomUsuario == "") {
      this.estadoCorreo = 'Escribe su nombre';
    }
  }

  // Método para verificar el correo del usuario
  verificarCorreo(event: Event): void {
    const regEmail = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    const correoUsuario = this.correo.value;

    const checkbox = document.getElementById('data-accepted') as HTMLInputElement;

    if (!regEmail.test(correoUsuario) || !checkbox.checked) {
      if (!regEmail.test(correoUsuario)) {
        this.estadoCorreo = 'Correo no válido';
      } else if (!checkbox.checked) {
        this.estadoCorreo = 'Debe aceptar los términos y condiciones';
      }
      this.controlBoton = true;
    } else {
      this.estadoCorreo = '';
      this.controlBoton = false;
    }

    // Asegurarse de que el valor del checkbox se actualice correctamente
    checkbox.addEventListener('change', () => {
      this.verificarCorreo(event);
    });
  }
}