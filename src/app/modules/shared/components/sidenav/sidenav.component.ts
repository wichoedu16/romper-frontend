import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;
  
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

}
