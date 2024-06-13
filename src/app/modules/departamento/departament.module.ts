import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentComponent } from './departament/departament.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewDepartamentComponent } from './new-departament/new-departament.component';

@NgModule({
  declarations: [
    DepartamentComponent,
    NewDepartamentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DepartamentModule { }
