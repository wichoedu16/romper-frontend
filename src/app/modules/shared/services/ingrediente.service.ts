import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class IngredienteService {
  constructor(private http: HttpClient) {}

  buscarTodos() {
    const endpoint = `${base_url}/ingredientes`;
    return this.http.get(endpoint);
  }

  buscarPorId(id: any) {
    const endpoint = `${base_url}/ingredientes/${id}`;
    return this.http.get(endpoint);
  }

  filtrarInventarioPorFecha(fechaDesde: any, fechaHasta: any) {
    throw new Error('Method not implemented.');
  }

  buscarPorNombre(name: any) {
    const endpoint = `${base_url}/ingredientes/filtro/${name}`;
    return this.http.get(endpoint);
  }

  crear(body: any) {
    const endpoint = `${base_url}/ingredientes`;
    return this.http.post(endpoint, body);
  }

  actualizar(body: any, id: any) {
    const endpoint = `${base_url}/ingredientes/${id}`;
    return this.http.put(endpoint, body);
  }

  eliminar(id: any) {
    const endpoint = `${base_url}/ingredientes/${id}`;
    return this.http.delete(endpoint);
  }

  exportarExcel() {
    const endpoint = `${base_url}/ingredientes/exportar/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}