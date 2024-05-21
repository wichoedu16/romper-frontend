import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  
  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Empleados", route: "employee", icon: "person"}
  ] 

  constructor(media: MediaMatcher){

    this.mobileQuery = media.matchMedia('(max-width: 600px)');

  }
  ngOnInit(): void {
      
  }
}
