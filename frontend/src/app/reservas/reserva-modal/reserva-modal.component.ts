import { Component, Input, Output, EventEmitter, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservasService } from '../reservas.service';
import { ServiciosService } from '../../servicios/servicios.service';

@Component({
  selector: 'app-reserva-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-modal.component.html',
})
export class ReservaModalComponent implements OnInit {
  @Input() servicio: any = null; 
  @Output() close = new EventEmitter<void>(); 

  private fb = inject(FormBuilder);
  private reservasService = inject(ReservasService);
  private serviciosService = inject(ServiciosService);

  listaServicios = signal<any[]>([]);
  
  reservaForm: FormGroup = this.fb.group({
    nombreCliente: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    fecha: ['', Validators.required], // <-- FALTABA ESTA COMA
    servicioId: ['', Validators.required]
  });

  ngOnInit() {
    if (this.servicio) {
      this.reservaForm.patchValue({ servicioId: this.servicio._id });
    } else {
      this.serviciosService.getServicios().subscribe(data => {
        this.listaServicios.set(data);
      });
    }
  }

  onSubmit() {
    console.log('Botón pulsado. Estado del formulario:', this.reservaForm.valid);

    if (this.reservaForm.valid) {
      const formValues = this.reservaForm.value;

      // Buscamos el servicio elegido para obtener su nombre (title)
      const servicioElegido = this.servicio || 
      this.listaServicios().find(s => s._id === formValues.servicioId);

      const datosReserva = {
        ...formValues,
        nombreServicio: servicioElegido?.title || 'Servicio General'
      };

      console.log('Enviando datos...', datosReserva);

      this.reservasService.crearReserva(datosReserva).subscribe({
        next: (res) => {
          alert('¡Cita reservada con éxito!');
          this.close.emit();
        },
        error: (err) => {
          console.error('Error del servidor:', err);
          alert('Hubo un error al reservar.');
        }
      });
    } else {
      console.log('Formulario inválido');
      this.reservaForm.markAllAsTouched(); 
    }
  }

  cerrar() {
    this.close.emit();
  }
}