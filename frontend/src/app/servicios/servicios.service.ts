import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'https://nesia-backend.onrender.com/home'; // La URL de la API de NestJS en Render.com
  constructor(private http: HttpClient) { }

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}