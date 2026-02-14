import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // Importamos esto para que funcionen los enlaces
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // Signal: false = cerrado, true = abierto
  menuAbierto = signal<boolean>(false);

  // Función para el botón de hamburguesa
  toggleMenu() {
    this.menuAbierto.update(valor => !valor);
  }

  // Función para cerrar el menú cuando hacemos clic en un enlace (UX vital en móviles)
  closeMenu() {
    this.menuAbierto.set(false);
  }
}