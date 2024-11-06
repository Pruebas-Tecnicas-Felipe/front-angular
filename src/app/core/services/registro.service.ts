import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  registroUser(formData: any): Observable<any> {
    const url = `http://localhost:8000/api/register`;
    console.log(formData);
    return this.http.post<any>(url, formData).pipe(

      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }
}
