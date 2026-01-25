import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <--- 1. Esto suele ser lo que falta
import { Observable } from 'rxjs'; // <--- 2. Para manejar la respuesta asíncrona

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  // Asegúrate de que esta URL coincida con tu backend (puerto 3000)
  private apiUrl = 'http://localhost:3000/reservas'; 

  // <--- 3. Aquí inyectamos el cliente HTTP
  constructor(private http: HttpClient) { }

  // Método para enviar los datos al backend
  crearReserva(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }
obtenerReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}