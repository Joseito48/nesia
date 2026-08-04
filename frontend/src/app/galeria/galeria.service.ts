import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private getApiUrl() {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.hostname === 'localhost'
        ? 'http://localhost:3000/galeria'
        : 'https://nesiadetailcar.es/api/galeria';
    }

    return 'https://nesiadetailcar.es/api/galeria';
  }

  private getHeaders(): HttpHeaders {
    let token = 'false';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('adminToken') || 'false';
    }

    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getGaleria(): Observable<any[]> {
    return this.http.get<any[]>(this.getApiUrl());
  }

  subirImagen(file: File, datos: { title: string; description: string; category: string }): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', datos.title);
    formData.append('description', datos.description);
    formData.append('category', datos.category);

    return this.http.post(this.getApiUrl() + '/upload', formData, { headers: this.getHeaders() });
  }
}
