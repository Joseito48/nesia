import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // La señal reactiva sigue funcionando igual de bien
  isAdmin = signal<boolean>(this.checkToken());

  // URL de tu backend en local (ajusta el puerto o la ruta si es distinta en NestJS)
  private readonly API_URL = 'http://localhost:3000/auth/login';

  // Inyectamos el HttpClient para hacer peticiones al servidor
  constructor(private router: Router, private http: HttpClient) {}

  // Ahora comprobamos si existe un Token JWT real, no solo la palabra 'true'
  private checkToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      return !!token; // Devuelve true si hay token, false si es null
    }
    return false;
  }

  // MÉTODO LOGIN REAL
  // Recibe los datos, hace el POST y devuelve un Observable al componente
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.API_URL, { username, password }).pipe(
      tap((respuestaBackend) => {
        // El 'tap' nos permite interceptar la respuesta correcta del servidor
        // Asumimos que NestJS nos devuelve un objeto con { access_token: '...' }
        localStorage.setItem('adminToken', respuestaBackend.access_token);
        this.isAdmin.set(true); 
      })
    );
  }

  // MÉTODO LOGOUT
  logout() {
    localStorage.removeItem('adminToken');
    this.isAdmin.set(false);
    this.router.navigate(['/']);
  }
}