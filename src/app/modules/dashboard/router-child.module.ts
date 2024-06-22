import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from '../empleado/components/employee/employee.component';
import { DepartamentComponent } from '../departamento/departament/departament.component';
import { CargoComponent } from '../cargo/cargo/cargo.component';
import { RecetaComponent } from '../receta/receta/receta.component';
import { IngredienteComponent } from '../ingrediente/ingrediente/ingrediente.component';
import { ProveedorComponent } from '../proveedor/proveedor/proveedor.component';
import { VentaComponent } from '../venta/venta/venta.component';
import { InventarioComponent } from '../ingrediente/inventario/inventario.component';

const childRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'employee', component: EmployeeComponent},
    { path: 'departament', component: DepartamentComponent},
    { path: 'cargo', component: CargoComponent},
    { path: 'receta', component: RecetaComponent},
    { path: 'ingrediente', component: IngredienteComponent},
    { path: 'proveedor', component: ProveedorComponent},
    { path: 'venta', component: VentaComponent},
    { path: 'inventario', component: InventarioComponent},
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
