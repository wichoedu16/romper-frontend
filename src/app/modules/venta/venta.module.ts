import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaComponent } from './venta/venta.component';
import { NewVentaComponent } from './new-venta/new-venta.component';



@NgModule({
  declarations: [
    VentaComponent,
    NewVentaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VentaModule { }
