import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  /**
     * 
     * @returns get all departaments
     */
  buscarTodos(){
    const endpoint = `${base_url}/proveedores`;
    return this.http.get(endpoint);
  }
  /**
  * 
  * @param id 
  * @returns 
  */
  buscarPorId(id : any){
    const endpoint = `${base_url}/proveedores/${id}`;
    return this.http.get(endpoint);
  }
  /**
  * 
  * @param id 
  * @returns 
  */
  buscarPorNombre(name : any){
    const endpoint = `${base_url}/proveedores/filtro/${name}`;
    return this.http.get(endpoint);
  }
  /**
   * 
   * @param body 
   * @returns departament
   */
  crear(body:any){
    const endpoint = `${base_url}/proveedores`;
    return this.http.post(endpoint, body);
  }
  /**
   * 
   * @param body 
   * @param id 
   * @returns 
   */
  actualizar(body: any, id: any){
    const endpoint = `${base_url}/proveedores/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  eliminar(id: any){
    const endpoint = `${base_url}/proveedores/${id}`;
    return this.http.delete(endpoint);
  }
}
