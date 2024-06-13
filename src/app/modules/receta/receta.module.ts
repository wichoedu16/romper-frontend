import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetaComponent } from './receta/receta.component';
import { NewRecetaComponent } from './new-receta/new-receta.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreparacionComponent } from './preparacion/preparacion.component';



@NgModule({
  declarations: [
    RecetaComponent,
    NewRecetaComponent,
    PreparacionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecetaModule { }
