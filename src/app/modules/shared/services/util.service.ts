import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private keycloakService: KeycloakService) { }

  obtenerRoles(){
    return this.keycloakService.getUserRoles();
  }

  validarAdministrador(){
    let roles = this.keycloakService.getUserRoles().filter( role => role == "admin");

    if(roles.length > 0)
      return true;
    else
      return false;
  }
}
