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
  
  // 3. CAMBIO CLAVE: Usaremos una Signal para el modal también
  servicioSeleccionado = signal<any>(null); 

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

  // 4. Función para abrir (con CHIVATO en consola)
  abrirModal(servicio: any) {
    console.log('CLICK RECIBIDO. Abriendo modal para:', servicio.title);
    this.servicioSeleccionado.set(servicio); // Actualizamos la signal
  }

  // 5. Función para cerrar
  cerrarModal() {
    this.servicioSeleccionado.set(null);
  }
}