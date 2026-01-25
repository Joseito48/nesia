import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-reserva-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-modal.component.html',
})
export class ReservaModalComponent {
  @Input() servicio: any; // Recibimos el servicio que el cliente quiere
  @Output() close = new EventEmitter<void>(); // Para avisar de cerrar el modal

  private fb = inject(FormBuilder);
  private reservasService = inject(ReservasService);

  reservaForm: FormGroup = this.fb.group({
    nombreCliente: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    fecha: ['', Validators.required]
  });

  onSubmit() {
  {
    // 1. CHIVATO: ¿Entra aquí al hacer click?
    console.log('Botón pulsado. Estado del formulario:', this.reservaForm.valid);
    console.log('Errores:', this.reservaForm.errors);

    if (this.reservaForm.valid && this.servicio) {
      console.log('Enviando datos...', this.reservaForm.value); // 2. CHIVATO

      const datosReserva = {
        ...this.reservaForm.value,
        servicioId: this.servicio._id,
        nombreServicio: this.servicio.title
      };

      this.reservasService.crearReserva(datosReserva).subscribe({
        next: (res) => {
          console.log('Respuesta del servidor:', res); // 3. CHIVATO ÉXITO
          alert('¡Cita reservada con éxito!');
          this.close.emit();
        },
        error: (err) => {
          console.error('Error del servidor:', err); // 4. CHIVATO ERROR
          alert('Hubo un error al reservar.');
        }
      });
    } else {
      // 5. CHIVATO: Si no entra al if, nos dice por qué
      console.log('Formulario inválido o falta servicio');
      // Truco: Marcar todos los campos como "tocados" para ver cuál falla en rojo
      this.reservaForm.markAllAsTouched(); 
    }
  }
  }

  cerrar() {
    this.close.emit();
  }
}