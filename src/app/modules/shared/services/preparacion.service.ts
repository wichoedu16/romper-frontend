import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class PreparacionService {

  constructor(private http: HttpClient) {}

  crear(body: any) {
    const endpoint = `${base_url}/preparaciones`;
    return this.http.post(endpoint, body);
  }

  eliminarIngrediente(platoId: string, ingredienteId: string): Observable<any> {
    const endpoint = `${base_url}/preparaciones/plato/${platoId}/${ingredienteId}`;
    return this.http.delete(endpoint);
  }


  buscarPorPlatoId(id : any){
    const endpoint = `${base_url}/preparaciones/plato/${id}`;
    return this.http.get(endpoint, id);
  }

}
