import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../reservas/reservas.service';
import { ServiciosService } from '../servicios/servicios.service';
import { GaleriaService } from '../galeria/galeria.service';

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
  serviciosCatalogo = signal<any[]>([]);
  galeriaItems = signal<any[]>([]);
  imagenPreview = signal<string | null>(null);
  urlImagenCloudinary = signal<string>('');
  subiendoImagen = signal<boolean>(false);

  //--- VARIABLES PARA NUEVO SERVICIO ---
  nombreNuevoServicio: string = '';
  precioNuevoServicio: number | null = null;
  descripcionNuevoServicio: string = '';
  tituloNuevaGaleria: string = '';
  categoriaNuevaGaleria: string = '';
  descripcionNuevaGaleria: string = '';
  imagenGaleriaPreview = signal<string | null>(null);
  urlImagenGaleria = signal<string>('');
  subiendoGaleria = signal<boolean>(false);
  archivoGaleriaSeleccionado = signal<File | null>(null);
  //--- VARIABLE PARA EDICIÓN DE SERVICIO ---
  servicioEnEdicionId: string | null = null;

  private reservasService = inject(ReservasService);
  private serviciosService = inject(ServiciosService);
  private galeriaService = inject(GaleriaService);

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarServicios();
    this.cargarGaleria();
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

  cargarGaleria() {
    this.galeriaService.getGaleria().subscribe({
      next: (data) => this.galeriaItems.set(data),
      error: (err) => console.error('Error al cargar galería:', err)
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

  borrarReserva(id: string) {
    if (confirm('¿Seguro que quieres eliminar esta cita?')) {
      this.reservasService.borrarReserva(id).subscribe({
        next: () => {
          alert('Cita eliminada correctamente');
          this.cargarReservas();
        },
        error: (err) => {
          console.error('Error al borrar la reserva:', err);
          alert('No se pudo eliminar la cita.');
        }
      });
    }
  }

  // <--- Función para rellenar el formulario al editar --->
  editarServicio(servicio: any) {
    this.servicioEnEdicionId = servicio._id;
    this.nombreNuevoServicio = servicio.title;
    this.precioNuevoServicio = servicio.price;
    this.descripcionNuevoServicio = servicio.description; // Rellenamos la descripción
    this.urlImagenCloudinary.set(servicio.image);
    this.imagenPreview.set(servicio.image); // Mostramos la foto actual
    
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Subimos al principio
  }
  // <---Función para cancelar la edición --->
  cancelarEdicion() {
    this.limpiarFormulario();
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

  onGaleriaFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.archivoGaleriaSeleccionado.set(file);
      const reader = new FileReader();
      reader.onload = () => this.imagenGaleriaPreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  subirGaleria() {
    const file = this.archivoGaleriaSeleccionado();
    if (!file) {
      alert('Selecciona una imagen antes de subirla.');
      return;
    }

    if (!this.tituloNuevaGaleria || !this.categoriaNuevaGaleria) {
      alert('Añade un título y una categoría para la imagen.');
      return;
    }

    this.subiendoGaleria.set(true);
    this.galeriaService.subirImagen(file, {
      title: this.tituloNuevaGaleria,
      description: this.descripcionNuevaGaleria,
      category: this.categoriaNuevaGaleria
    }).subscribe({
      next: () => {
        this.subiendoGaleria.set(false);
        alert('¡Imagen añadida a la galería!');
        this.limpiarGaleria();
        this.cargarGaleria();
      },
      error: (err) => {
        console.error('Error subiendo galería:', err);
        this.subiendoGaleria.set(false);
        alert('Error al subir la imagen a la galería.');
      }
    });
  }

  // 2. Guardar Servicio en MongoDB
guardarServicio() {
    if (!this.nombreNuevoServicio || !this.precioNuevoServicio || !this.urlImagenCloudinary()) {
      alert('Por favor, rellena nombre, precio, descripción y espera a que se suba la imagen.');
      return;
    }

    const datosServicio = {
      title: this.nombreNuevoServicio,
      description: this.descripcionNuevoServicio || 'Servicio creado desde Panel Admin', // Usamos la nueva variable
      price: this.precioNuevoServicio,
      image: this.urlImagenCloudinary()
    };

    if (this.servicioEnEdicionId) {
      // MODO EDICIÓN
      this.serviciosService.updateServicio(this.servicioEnEdicionId, datosServicio).subscribe({
        next: () => {
          alert('¡Servicio actualizado con éxito!');
          this.limpiarFormulario();
          this.cargarServicios();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar en la base de datos.');
        }
      });
    } else {
      // MODO CREACIÓN
      this.serviciosService.crearServicio(datosServicio).subscribe({
        next: (res) => {
          alert('¡Servicio guardado con éxito!');
          this.limpiarFormulario();
          this.cargarServicios();
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar en la base de datos.');
        }
      });
    }
  }

  // <--- ACTUALIZADO: Limpiamos la descripción y el estado de edición --->
  limpiarFormulario() {
    this.servicioEnEdicionId = null; 
    this.nombreNuevoServicio = '';
    this.precioNuevoServicio = null;
    this.descripcionNuevoServicio = '';
    this.imagenPreview.set(null);
    this.urlImagenCloudinary.set('');
    
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  limpiarGaleria() {
    this.tituloNuevaGaleria = '';
    this.categoriaNuevaGaleria = '';
    this.descripcionNuevaGaleria = '';
    this.imagenGaleriaPreview.set(null);
    this.urlImagenGaleria.set('');
    this.archivoGaleriaSeleccionado.set(null);

    const fileInput = document.getElementById('galeriaFileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }
}