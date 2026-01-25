import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservasService } from '../reservas/reservas.service';

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