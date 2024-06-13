import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { } 
    /**
     * 
     * @returns get all employees
     */
    getEmployees(){
      const endpoint = `${base_url}/empleados`;
      return this.http.get(endpoint);
    }
    /**
    * 
    * @param id 
    * @returns 
    */
    getEmployeeById(id : any){
      const endpoint = `${base_url}/empleados/${id}`;
      return this.http.get(endpoint);
    }
    /**
    * 
    * @param id 
    * @returns 
    */
    getEmployeeByName(name : any){
      const endpoint = `${base_url}/empleados/filter/${name}`;
      return this.http.get(endpoint);
    }
    /**
     * 
     * @param body 
     * @returns employee
     */
    saveEmployee(body:any){
      const endpoint = `${base_url}/empleados`;
      return this.http.post(endpoint, body);
    }
    /**
     * 
     * @param body 
     * @param id 
     * @returns 
     */
    updateEmployee(body: any, id: any){
      const endpoint = `${base_url}/empleados/${id}`;
      return this.http.put(endpoint, body);
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    deleteEmployee(id: any){
      const endpoint = `${base_url}/empleados/${id}`;
      return this.http.delete(endpoint);
    }
}
