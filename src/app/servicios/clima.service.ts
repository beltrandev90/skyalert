import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClimaDatos } from '../models/clima.model'; // Asegúrate de usar la ruta correcta

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey = '07e42ec65cad0b03d54498b90b41c1e5'; // Reemplaza si es necesario
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&lang=es`;

  constructor(private http: HttpClient) {}

  obtenerClima(ciudad: string): Observable<ClimaDatos> {
    return this.http.get<ClimaDatos>(`${this.apiUrl}&q=${ciudad}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error.message);
    return throwError('Ocurrió un error al obtener el clima; intenta nuevamente más tarde.');
  }
}
