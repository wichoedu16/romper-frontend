import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { NewProveedorComponent } from './new-proveedor/new-proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    ProveedorComponent,
    NewProveedorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProveedorModule { }
