import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private getApiUrl() {
    // 1. Detección de entorno (Local vs Producción)
    if (isPlatformBrowser(this.platformId)) {
      return window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/servicios' 
        : 'https://nesia-backend.onrender.com/servicios';
    }
    // 2. Fallback para entorno de servidor (SSR)
    return 'https://nesia-backend.onrender.com/servicios';
  }

  // Obtener todos los servicios (GET)
  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.getApiUrl());
  }

  // Subir imagen a Cloudinary (POST /upload)
  subirImagen(file: File): Observable<{ url: string, public_id: string }> {
    const formData = new FormData();
    formData.append('file', file); 

    return this.http.post<{ url: string, public_id: string }>(
      `${this.getApiUrl()}/upload`, 
      formData
    );
  }

  // Guardar el servicio completo en MongoDB (POST /servicios)
  crearServicio(servicio: any): Observable<any> {
    return this.http.post(this.getApiUrl(), servicio);
  }
}