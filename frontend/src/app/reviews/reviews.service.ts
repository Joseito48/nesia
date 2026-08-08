import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private getApiUrl(): string {
    if (isPlatformBrowser(this.platformId) && window.location.hostname === 'localhost') {
      return 'http://localhost:3000/reviews';
    }
    return 'https://nesiadetailcar.es/api/reviews';
  }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.getApiUrl());
  }

  createReview(review: { name: string; comment: string; rating: number }): Observable<any> {
    return this.http.post(this.getApiUrl(), review);
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.getApiUrl()}/${id}`);
  }
}
