import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './galeria.component.html',
  
})
export class GaleriaComponent {
  // Lista de proyectos. En el futuro esto vendrá de la base de datos.
  proyectos = [
    {
      titulo: 'Tratamiento Cerámico',
      categoria: 'Exterior',
      img: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop'
    },
    {
      titulo: 'Limpieza Integral',
      categoria: 'Interior',
      img: 'https://res.cloudinary.com/dye6oqzgy/image/upload/v1771175465/images_jedkqc.jpg'
    },
    {
      titulo: 'Corrección de Pintura',
      categoria: 'Pulido',
      img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
    },
    {
      titulo: 'Restauración de Faros',
      categoria: 'Restauración',
      img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop'
    },
    {
      titulo: 'Detailing Motor',
      categoria: 'Motor',
      img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop'
    },
    {
      titulo: 'Lavado Premium',
      categoria: 'Exterior',
      img: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1000&auto=format&fit=crop'
    }
  ];
}