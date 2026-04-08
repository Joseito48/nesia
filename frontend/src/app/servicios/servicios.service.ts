import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // <--- Añadimos HttpHeaders
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

  // --- NUEVA FUNCIÓN: Sacar el pase VIP (Token) del LocalStorage ---
  private getHeaders(): HttpHeaders {
    let token = 'false';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('adminToken') || 'false';
    }
    // Devolvemos la cabecera formateada
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // Obtener todos los servicios (GET) - PÚBLICO (No lleva headers)
  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.getApiUrl());
  }

  // Subir imagen a Cloudinary (POST /upload) - PROTEGIDO 🔒
  subirImagen(file: File): Observable<{ url: string, public_id: string }> {
    const formData = new FormData();
    formData.append('file', file); 

    return this.http.post<{ url: string, public_id: string }>(
      `${this.getApiUrl()}/upload`, 
      formData,
      { headers: this.getHeaders() } // <--- Mandamos el token
    );
  }

  // Guardar el servicio completo en MongoDB (POST /servicios) - PROTEGIDO 🔒
  crearServicio(servicio: any): Observable<any> {
    return this.http.post(this.getApiUrl(), servicio, { headers: this.getHeaders() }); // <--- Mandamos el token
  }
  
  // Borrar un servicio (DELETE) - PROTEGIDO 🔒
  borrarServicio(id: string): Observable<any> {
    return this.http.delete(`${this.getApiUrl()}/${id}`, { headers: this.getHeaders() }); // <--- Mandamos el token
  }
}