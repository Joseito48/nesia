import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Necesario para los inputs
import { ReservasService } from '../reservas/reservas.service';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  // --- SIGNALS (Para visualización y estado) ---
  reservas = signal<any[]>([]);
  cargando = signal<boolean>(true);
  
  // Signals para la imagen (estos se quedan como signals porque son reactivos)
  imagenPreview = signal<string | null>(null);
  urlImagenCloudinary = signal<string>('');
  subiendoImagen = signal<boolean>(false);
  
  // --- VARIABLES NORMALES (Para el formulario) ---
  // Las cambiamos a variables simples para evitar conflictos con ngModel
  nombreNuevoServicio: string = '';
  precioNuevoServicio: number | null = null;

  private reservasService = inject(ReservasService);
  private serviciosService = inject(ServiciosService);

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.cargando.set(true);
    this.reservasService.obtenerReservas().subscribe({
      next: (data) => {
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

  // 1. Lógica de Subida de Imagen
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Vista previa
      const reader = new FileReader();
      reader.onload = () => this.imagenPreview.set(reader.result as string);
      reader.readAsDataURL(file);

      // Subir al Backend
      this.subiendoImagen.set(true);
      this.serviciosService.subirImagen(file).subscribe({
        next: (res) => {
          this.urlImagenCloudinary.set(res.url); // Guardamos la URL de Cloudinary
          this.subiendoImagen.set(false);
          console.log('Imagen subida:', res.url);
        },
        error: (err) => {
          console.error('Error subida:', err);
          this.subiendoImagen.set(false);
          alert('Error al subir la imagen a la nube.');
        }
      });
    }
  }

  // 2. Guardar Servicio en MongoDB
  guardarServicio() {
    // Validamos usando las variables normales (sin paréntesis)
    if (!this.nombreNuevoServicio || !this.precioNuevoServicio || !this.urlImagenCloudinary()) {
      alert('Por favor, rellena nombre, precio y espera a que se suba la imagen.');
      return;
    }

    // CREAMOS EL OBJETO EXACTO QUE PIDE EL BACKEND
    // El backend espera: title, price, image, description
    const nuevoServicio = {
      title: this.nombreNuevoServicio,       // <--- Enviamos 'title'
      description: 'Servicio creado desde Panel Admin', // Descripción por defecto
      price: this.precioNuevoServicio,       // <--- Enviamos 'price'
      image: this.urlImagenCloudinary()      // <--- Enviamos la URL de la imagen
    };

    console.log('Enviando datos:', nuevoServicio);

    this.serviciosService.crearServicio(nuevoServicio).subscribe({
      next: (res) => {
        alert('¡Servicio guardado con éxito!');
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Error al guardar en la base de datos. Revisa la consola.');
      }
    });
  }

  limpiarFormulario() {
    // Reseteamos variables
    this.nombreNuevoServicio = '';
    this.precioNuevoServicio = null;
    
    // Reseteamos signals
    this.imagenPreview.set(null);
    this.urlImagenCloudinary.set('');
    
    // Limpiamos el input file visualmente
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}