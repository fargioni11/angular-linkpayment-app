// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth'; // URL base del backend

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, { username, password })
      .pipe(catchError(this.handleError));
  }

  
  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, { username, password })
      .pipe(catchError(this.handleError));
  }

 
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
