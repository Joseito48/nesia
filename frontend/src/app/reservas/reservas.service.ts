import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private getApiUrl() {
    // Protección para evitar el error "window is not defined"
    if (isPlatformBrowser(this.platformId)) {
      return window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/reservas' 
        : 'https://nesia-backend.onrender.com/reservas';
    }
    // Fallback para el servidor (SSR)
    return 'https://nesia-backend.onrender.com/reservas';
  }

  crearReserva(datos: any): Observable<any> {
    return this.http.post(this.getApiUrl(), datos);
  }

  obtenerReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.getApiUrl());
  }
}