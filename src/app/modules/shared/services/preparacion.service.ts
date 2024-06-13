import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
