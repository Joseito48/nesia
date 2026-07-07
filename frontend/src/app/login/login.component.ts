import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router'; // <-- Añadido Router
import { AuthService } from '../auth.service';

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

  // Inyectamos el AuthService y el Router para redirigir si el login es correcto
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    // 1. Limpiamos mensajes de error anteriores
    this.errorMessage = '';

    // 2. Le pasamos los datos al servicio para que le pregunte al backend
    this.authService.login(this.username, this.password).subscribe({
      next: (respuestaServidor) => {
        // Si el backend dice que todo está bien, entramos al panel
        this.router.navigate(['/admin']); // Cambia la ruta a donde tengas tu panel
      },
      error: (error) => {
        // Si el backend devuelve un error (ej. Error 401 Unauthorized)
        this.errorMessage = 'Usuario o contraseña incorrectos 🚫';
      }
    });
  }
}