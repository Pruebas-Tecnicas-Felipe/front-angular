import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  createCategory(formData: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.post<any>(`${this.apiUrl}/categories`, formData, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }

  categoryAll(): Observable<any[]> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.get<any>(`${this.apiUrl}/allCategories`, { headers }).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return throwError('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }
}
