import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  createPost(formData: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.post<any>(`${this.apiUrl}/posts`, formData, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }

  postsAll(): Observable<any[]> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.get<any>(`${this.apiUrl}/allPosts`, { headers }).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return throwError('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }

  countPost(): Observable<number> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.get<{ post_count: number }>(`${this.apiUrl}/countPosts`, { headers }).pipe(
      map(response => response.post_count), // Extrae solo el número de posts
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Algo salió mal. Por favor, inténtalo de nuevo más tarde.'));
      })
    );
  }

}
