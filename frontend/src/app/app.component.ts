import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // <--- Importamos el menú inteligente

@Component({
  selector: 'app-root',
  standalone: true,
  // Aquí importamos todo lo que vamos a usar en el HTML
  imports: [CommonModule, RouterOutlet, NavbarComponent], 
  
  // CAMBIO CLAVE: Usamos templateUrl en lugar de template
  templateUrl: './app.component.html', 
  styleUrls: [] // Si tienes app.component.css, ponlo aquí
})
export class AppComponent {
  title = 'Nesia';
}