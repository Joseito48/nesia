import { Component, signal } from '@angular/core'; // Ya no hace falta OnInit
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service'; // <--- 1. Importar servicio

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  
})
export class NavbarComponent {
  menuAbierto = signal(false);
  
  // 2. Hacemos el servicio "public" para poder usarlo en el HTML
  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.menuAbierto.update(val => !val);
  }

  closeMenu() {
    this.menuAbierto.set(false);
  }

  logout() {
    // 3. Delegamos el logout al servicio
    this.authService.logout();
    this.closeMenu();
  }
}