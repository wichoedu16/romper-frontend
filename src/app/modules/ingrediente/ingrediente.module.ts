import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { NewIngredienteComponent } from './new-ingrediente/new-ingrediente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { InventarioComponent } from './inventario/inventario.component';



@NgModule({
  declarations: [
    IngredienteComponent,
    NewIngredienteComponent,
    InventarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IngredienteModule { }
