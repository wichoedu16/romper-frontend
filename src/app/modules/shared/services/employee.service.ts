import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { } 
    /**
     * 
     * @returns get all employees
     */
  getEmployees(){
      const endpoint = `${base_url}/employees`;
      return this.http.get(endpoint);
    }
  
    /**
     * 
     * @param body 
     * @returns employee
     */
    saveEmployee(body:any){
      const endpoint = `${base_url}/employees`;
      return this.http.post(endpoint, body);
    }

    /**
     * 
     * @param body 
     * @param id 
     * @returns 
     */
    updateEmployee(body: any, id: any){
      const endpoint = `${base_url}/employees/ ${id}`;
      return this.http.put(endpoint, body);
    }
}
