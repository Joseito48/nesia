import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservasService } from '../reservas/reservas.service';

//  Componente para la página de administración, aquí se define el componente de Angular que se encargará de mostrar la lista de reservas realizadas, esta página es accesible solo para administradores y muestra información detallada de cada reserva, incluyendo el nombre del cliente, el servicio reservado, la fecha de la reserva y la fecha de creación. Utiliza una Signal para almacenar las reservas y otra para controlar el estado de carga mientras se obtienen los datos del backend a través del servicio ReservasService.
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  // Signal para almacenar las reservas
  reservas = signal<any[]>([]);
  // Signal para controlar si estamos cargando
  cargando = signal<boolean>(true);

  private reservasService = inject(ReservasService);

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.cargando.set(true);
    this.reservasService.obtenerReservas().subscribe({
      next: (data) => {
        // Ordenamos las reservas para que la más reciente salga primero
        const ordenadas = data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.reservas.set(ordenadas);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar reservas:', err);
        this.cargando.set(false);
      }
    });
  }
}