import { Component, OnInit, inject } from '@angular/core';
import { EmpleadoService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartamentComponent } from 'src/app/modules/departamento/departament/departament.component';
import { DepartamentService } from '../../services/departament.service';
import { CargoService } from '../../services/cargo.service';
import { RecetaService } from '../../services/receta.service';
import { IngredienteService } from '../../services/ingrediente.service';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  private employeeService = inject(EmpleadoService);
  private cargoService = inject(CargoService);
  private departamentService = inject(DepartamentService);
  private recetaService = inject(RecetaService);
  private proveedorService = inject(ProveedorService);
  private ingredienteService = inject(IngredienteService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close(3);
  }

  delete() {
    if (this.data != null) {
      if (this.data.module == 'employee') {
        this.employeeService.deleteEmployee(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1);
          },
          (error: any) => {
            this.dialogRef.close(2);
          }
        );
      } else if (this.data.module == 'departament') {
        this.departamentService.eliminar(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1);
          },
          (error: any) => {
            this.dialogRef.close(2);
          }
        );
      } else if (this.data.module == 'cargo') {
        this.cargoService.delete(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1);
          },
          (error: any) => {
            this.dialogRef.close(2);
          }
        );
      } else if (this.data.module == 'receta') {
        this.recetaService.eliminar(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1);
          },
          (error: any) => {
            this.dialogRef.close(2);
          }
        );
      } else if (this.data.module == 'ingrediente') {
        this.ingredienteService.eliminar(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1);
          },
          (error: any) => {
            this.dialogRef.close(2);
          }
        );
      }  else if (this.data.module == 'proveedor') {
        this.ingredienteService.eliminar(this.data.id).subscribe(
          (data: any) => {
            this.dialogRef.close(1);
          },
          (error: any) => {
            this.dialogRef.close(2);
          }
        );
      }else {
        this.dialogRef.close(2);
      }
    }
  }
}
