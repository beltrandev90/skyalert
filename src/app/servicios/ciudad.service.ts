// src/app/servicios/ciudad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Ciudad } from '../models/ciudad.model';  // Importa la interfaz Ciudad

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private ciudadesUrl = '../../assets/cities.json';  // Ruta al archivo JSON en la carpeta assets.

  constructor(private http: HttpClient) { }

   // Método para cargar y filtrar ciudades
   filtrarCiudades(termino: string): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.ciudadesUrl).pipe(
      map(ciudades => {
        // Filtrar ciudades que coincidan con el término de búsqueda
        const ciudadesFiltradas = ciudades.filter(ciudad => 
          ciudad.name.toLowerCase().includes(termino.toLowerCase())
        );

        // Priorizar las ciudades de España al principio de la lista
        const ciudadesEspaña = ciudadesFiltradas.filter(ciudad => ciudad.country === 'ES');
        const otrasCiudades = ciudadesFiltradas.filter(ciudad => ciudad.country !== 'ES');

        // Combinar las ciudades de España primero y luego las demás
        return [...ciudadesEspaña, ...otrasCiudades];
      }),
      catchError(error => {
        console.error('Error al cargar las ciudades', error);
        return of([]);
      })
    );
  }
  
}
