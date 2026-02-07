import { Component, signal } from '@angular/core';
import { ReservaModalComponent } from '../reservas/reserva-modal/reserva-modal.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
//  Componente para la página de inicio, aquí se define el componente de Angular que se encargará de mostrar la página principal de la aplicación, incluye un botón para abrir el modal de reserva y un enlace para navegar a la página de servicios. Utiliza una Signal para controlar el estado del modal (abierto o cerrado).
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, ReservaModalComponent, RouterLink]
})
// 1. IMPORTANTE: Importar el componente del modal y RouterLink para navegación
export class HomeComponent {
modalAbierto = signal(false);
abrirReserva() {
  this.modalAbierto.set(true);
}
}