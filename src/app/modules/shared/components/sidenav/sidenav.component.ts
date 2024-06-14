import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private keycloackService = inject(KeycloakService);
  
  userName = "";

  menuNav = [
    {name: "Inicio", route: "home", icon: "home"},
    {name: "Proveedores", route: "proveedor", icon: "tapas"},
    {name: "Ingredientes", route: "ingrediente", icon: "kitchen"},
    {name: "Platos", route: "receta", icon: "menu_book"},
    {name: "Departamentos", route: "departament", icon: "dataset"},
    {name: "Cargos", route: "cargo", icon: "dataset"},
    {name: "Empleados", route: "employee", icon: "person"}   
  ] 

  constructor(media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  shouldRun = true;

  ngOnInit(): void { 
    this.userName = this.keycloackService.getUsername();
   }

  cerrarSesion(){
    this.keycloackService.logout();
  }
}
