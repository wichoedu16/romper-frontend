import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class VentaService {

 
  constructor(private http: HttpClient) { }

  buscarTodos(){
    const endpoint = `${base_url}/ventas`;
    return this.http.get(endpoint);
  }

  buscarPorFechas(fechaDesde:string, fechaHasta:string){
    const endpoint = `${base_url}/ventas/filtro/${fechaDesde}/${fechaHasta}`;
    return this.http.get(endpoint);
  }

  crear(body:any){
    const endpoint = `${base_url}/ventas`;
    return this.http.post(endpoint, body);
  }

  actualizar(body:any, id: any){
    console.log(body)
    const endpoint = `${base_url}/ventas/${id}`;
    return this.http.put(endpoint, body);
  }

  exportarExcel() {
    const endpoint = `${base_url}/ventas/exportar/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }


}
