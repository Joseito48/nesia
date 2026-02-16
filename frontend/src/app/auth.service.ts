import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Esta variable es reactiva: si cambia aquí, cambia en toda la web
  isAdmin = signal<boolean>(this.checkToken());

  constructor(private router: Router) {}

  // Función privada para leer el localStorage inicial
  private checkToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('adminToken') === 'true';
    }
    return false;
  }

  // MÉTODO LOGIN (Lo llamaremos desde login.component)
  login() {
    localStorage.setItem('adminToken', 'true');
    this.isAdmin.set(true); // <--- ¡AVISO IMPORTANTE! CAMBIA EL ESTADO
    this.router.navigate(['/admin']);
  }

  // MÉTODO LOGOUT (Lo llamaremos desde navbar.component)
  logout() {
    localStorage.removeItem('adminToken');
    this.isAdmin.set(false); // <--- ¡AVISO IMPORTANTE! CAMBIA EL ESTADO
    this.router.navigate(['/']);
  }
}