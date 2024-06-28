import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) {}

  buscarTodos() {
    const endpoint = `${base_url}/inventario`;
    return this.http.get(endpoint);
  }

  buscarPorIngredienteId(tipo: any) {
    const endpoint = `${base_url}/inventario/filtro/${tipo}`;
    return this.http.get(endpoint);
  }
  
  buscarPorTipo(idIngrediente: any) {
    const endpoint = `${base_url}/inventario/${idIngrediente}`;
    return this.http.get(endpoint);
  }

  crear(body: any) {
    const endpoint = `${base_url}/inventario`;
    return this.http.post(endpoint, body);
  }

  exportarExcel() {
    const endpoint = `${base_url}/inventario/exportar/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }

}
