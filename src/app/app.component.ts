import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegacionComponent } from './pages/menu-navegacion/menu-navegacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavegacionComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AmadeusAngular';
}
