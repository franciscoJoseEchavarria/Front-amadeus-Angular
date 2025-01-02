import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { IndexComponent } from "../index/index.component";
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-menu-navegacion',
  standalone: true,
  imports: [RouterLink, IndexComponent, UsuarioComponent],
  templateUrl: './menu-navegacion.component.html',
  styleUrl: './menu-navegacion.component.css'
})
export class MenuNavegacionComponent {

}
