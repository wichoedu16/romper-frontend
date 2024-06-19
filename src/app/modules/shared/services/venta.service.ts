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

  crear(body:any){
    const endpoint = `${base_url}/ventas`;
    return this.http.post(endpoint, body);
  }
}
