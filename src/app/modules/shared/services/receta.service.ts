import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = 'http://localhost:8080/api/v1';


@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  constructor(private http: HttpClient) {}

  obtenerTodos() {
    const endpoint = `${base_url}/recetas`;
    return this.http.get(endpoint);
  }

  obtenerPorNombre(name: any) {
    const endpoint = `${base_url}/recetas/filtro/${name}`;
    return this.http.get(endpoint);
  }

  crear(body: any) {
    const endpoint = `${base_url}/recetas`;
    return this.http.post(endpoint, body);
  }

  actualizar(body: any, id: any) {
    const endpoint = `${base_url}/recetas/${id}`;
    return this.http.put(endpoint, body);
  }

  eliminar(id: any) {
    const endpoint = `${base_url}/recetas/${id}`;
    return this.http.delete(endpoint);
  }
}
