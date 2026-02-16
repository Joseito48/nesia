import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service'; // <--- 1. Importar el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  // 2. Inyectar el servicio en el constructor
  constructor(private authService: AuthService) {}

  login() {
    const USER_CORRECTO = 'admin';
    const PASS_CORRECTO = 'Nesia2026';

    if (this.username === USER_CORRECTO && this.password === PASS_CORRECTO) {
      // 3. Usar el servicio para loguearse
      this.authService.login(); 
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos 🚫';
    }
  }
}