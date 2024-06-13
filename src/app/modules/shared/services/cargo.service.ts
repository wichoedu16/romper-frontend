import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @returns get all cargos
   */
  getAll() {
    const endpoint = `${base_url}/cargos`;
    return this.http.get(endpoint);
  }
  /**
   *
   * @param id
   * @returns
   */
  getById(id: any) {
    const endpoint = `${base_url}/cargos/${id}`;
    return this.http.get(endpoint);
  }
  /**
   *
   * @param id
   * @returns
   */
  getByName(name: any) {
    const endpoint = `${base_url}/cargos/filter/${name}`;
    return this.http.get(endpoint);
  }
  /**
   *
   * @param body
   * @returns cargo
   */
  save(body: any) {
    const endpoint = `${base_url}/cargos`;
    return this.http.post(endpoint, body);
  }
  /**
   *
   * @param body
   * @param id
   * @returns
   */
  update(body: any, id: any) {
    const endpoint = `${base_url}/cargos/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   *
   * @param id
   * @returns
   */
  delete(id: any) {
    const endpoint = `${base_url}/cargos/${id}`;
    return this.http.delete(endpoint);
  }
}
