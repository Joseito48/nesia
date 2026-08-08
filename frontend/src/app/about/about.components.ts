import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.components.html',
})
export class AboutComponent implements OnInit {
  private http = inject(HttpClient);

  reviews: any[] = [];
  name = '';
  comment = '';
  rating = 5;
  submitting = false;
  message = '';

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.http.get<any[]>('http://localhost:3000/reviews').subscribe({
      next: (data) => this.reviews = data,
      error: () => this.message = 'No se pudieron cargar las reseñas en este momento.'
    });
  }

  submitReview() {
    if (!this.name.trim() || !this.comment.trim()) {
      this.message = 'Rellena tu nombre y la opinión.';
      return;
    }

    this.submitting = true;
    this.http.post('http://localhost:3000/reviews', {
      name: this.name.trim(),
      comment: this.comment.trim(),
      rating: this.rating
    }).subscribe({
      next: () => {
        this.name = '';
        this.comment = '';
        this.rating = 5;
        this.message = '¡Gracias por tu reseña!';
        this.submitting = false;
        this.loadReviews();
      },
      error: () => {
        this.message = 'No se pudo enviar la reseña. Inténtalo de nuevo.';
        this.submitting = false;
      }
    });
  }
}