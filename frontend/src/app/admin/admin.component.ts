import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  
  // Para guardar la lista de servicios del catálogo
  serviciosCatalogo = signal<any[]>([]);
  
  // Signals para la imagen
  imagenPreview = signal<string | null>(null);
  urlImagenCloudinary = signal<string>('');
  subiendoImagen = signal<boolean>(false);
  
  // --- VARIABLES NORMALES (Para el formulario) ---
  nombreNuevoServicio: string = '';
  precioNuevoServicio: number | null = null;

  private reservasService = inject(ReservasService);
  private serviciosService = inject(ServiciosService);

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarServicios(); // Llamamos al cargar servicios al inicio
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

  //Obtener los servicios de Mongo
  cargarServicios() {
    this.serviciosService.getServicios().subscribe({
      next: (data) => this.serviciosCatalogo.set(data),
      error: (err) => console.error('Error al cargar catálogo:', err)
    });
  }

  // Borrar un servicio
  borrarServicio(id: string) {
    if (confirm('¿Estás seguro de borrar este servicio del catálogo?')) {
      this.serviciosService.borrarServicio(id).subscribe({
        next: () => {
          alert('Servicio borrado correctamente');
          this.cargarServicios(); // Recargamos la lista
        },
        error: (err) => {
          console.error('Error al borrar:', err);
          alert('Error al borrar el servicio');
        }
      });
    }
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
          this.urlImagenCloudinary.set(res.url); // Guardamos la URL
          this.subiendoImagen.set(false);
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
    if (!this.nombreNuevoServicio || !this.precioNuevoServicio || !this.urlImagenCloudinary()) {
      alert('Por favor, rellena nombre, precio y espera a que se suba la imagen.');
      return;
    }

    const nuevoServicio = {
      title: this.nombreNuevoServicio,
      description: 'Servicio creado desde Panel Admin',
      price: this.precioNuevoServicio,
      image: this.urlImagenCloudinary()
    };

    this.serviciosService.crearServicio(nuevoServicio).subscribe({
      next: (res) => {
        alert('¡Servicio guardado con éxito!');
        this.limpiarFormulario();
        this.cargarServicios(); // Recargamos la lista para ver el nuevo
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Error al guardar en la base de datos. Revisa la consola.');
      }
    });
  }

  limpiarFormulario() {
    this.nombreNuevoServicio = '';
    this.precioNuevoServicio = null;
    this.imagenPreview.set(null);
    this.urlImagenCloudinary.set('');
    
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}