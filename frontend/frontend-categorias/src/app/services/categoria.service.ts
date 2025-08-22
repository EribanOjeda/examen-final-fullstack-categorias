import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private baseUrl = '/api/categorias'; // pasa por el proxy

  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl);
  }

  crear(nombre: string): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrl, { nombre });
  }
}
