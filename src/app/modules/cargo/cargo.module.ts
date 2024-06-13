import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargoComponent } from './cargo/cargo.component';
import { NewCargoComponent } from './new-cargo/new-cargo.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CargoComponent,
    NewCargoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CargoModule { }
