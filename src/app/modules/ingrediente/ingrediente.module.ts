import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { NewIngredienteComponent } from './new-ingrediente/new-ingrediente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    IngredienteComponent,
    NewIngredienteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IngredienteModule { }
