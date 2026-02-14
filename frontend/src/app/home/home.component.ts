import { Component, signal } from '@angular/core';
import { ReservaModalComponent } from '../reservas/reserva-modal/reserva-modal.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, ReservaModalComponent, RouterLink] // Importamos el modal y RouterLink para los enlaces
})

export class HomeComponent {
modalAbierto = signal(false);
abrirReserva() {
  this.modalAbierto.set(true);
}
}