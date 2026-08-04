import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GaleriaService } from './galeria.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './galeria.component.html',
})
export class GaleriaComponent implements OnInit {
  proyectos = signal<any[]>([]);
  private galeriaService = inject(GaleriaService);

  ngOnInit(): void {
    this.galeriaService.getGaleria().subscribe({
      next: (data) => this.proyectos.set(data),
      error: (err) => console.error('Error al cargar galería:', err)
    });
  }
}