import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeModule } from '../empleado/employee.module';
import { DepartamentModule } from '../departamento/departament.module';
import { CargoModule } from '../cargo/cargo.module';
import { RecetaModule } from '../receta/receta.module';
import { IngredienteModule } from '../ingrediente/ingrediente.module';
import { ProveedorModule } from '../proveedor/proveedor.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeModule,
    DepartamentModule,
    CargoModule,
    RecetaModule,
    IngredienteModule,
    ProveedorModule
  ]
})
export class DashboardModule { }
