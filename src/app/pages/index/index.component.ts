import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  buttonText = "¡Dale click aquí o la imagen y prepárate para viajar!";

  onMouseOver(){
    this.buttonText = '¡Vamos a viajar!';

  }
  onMouseOut(){
    this.buttonText = "¡Dale click aquí o la imagen y prepárate para viajar!";
  }
  
}
