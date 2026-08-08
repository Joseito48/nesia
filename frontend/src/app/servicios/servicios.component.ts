import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosService } from './servicios.service';
// 1. IMPORTANTE: Importar el componente del modal
import { ReservaModalComponent } from '../reservas/reserva-modal/reserva-modal.component'; 

@Component({
  selector: 'app-servicios',
  standalone: true,
  // 2. IMPORTANTE: Añadirlo aquí
  imports: [CommonModule, ReservaModalComponent], 
  templateUrl: './servicios.component.html',
})
export class ServiciosComponent implements OnInit {
  servicios = signal<any[]>([]);
  
  servicioDetalle = signal<any>(null);
  servicioReserva = signal<any>(null);

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.serviciosService.getServicios().subscribe({
      next: (data) => this.servicios.set(data),
      error: (err) => console.error(err)
    });
  }

  abrirDetalle(servicio: any) {
    this.servicioDetalle.set(servicio);
    this.servicioReserva.set(null);
  }

  cerrarDetalle() {
    this.servicioDetalle.set(null);
  }

  abrirReserva(servicio: any) {
    this.servicioReserva.set(servicio);
    this.servicioDetalle.set(null);
  }

  cerrarReserva() {
    this.servicioReserva.set(null);
  }
}