import { Injectable, inject, PLATFORM_ID } from '@angular/core'; // <-- Importar PLATFORM_ID
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // <-- Importar esto

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID); // <-- Inyectamos el detector de plataforma

  private getApiUrl() {
    // 1. Preguntamos: ¿Estamos en un navegador?
    if (isPlatformBrowser(this.platformId)) {
      // Si sí, es seguro usar 'window'
      return window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/servicios' 
        : 'https://nesia-backend.onrender.com/servicios';
    }
    
    // 2. Si NO estamos en un navegador (estamos en el servidor/terminal),
    // devolvemos la URL de producción por defecto para evitar el error.
    return 'https://nesia-backend.onrender.com/servicios';
  }

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.getApiUrl());
  }
}