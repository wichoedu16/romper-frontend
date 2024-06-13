import { Component, OnInit, inject } from '@angular/core';
import { CargoService } from '../../shared/services/cargo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentService } from '../../shared/services/departament.service';

@Component({
  selector: 'app-new-cargo',
  templateUrl: './new-cargo.component.html',
  styleUrls: ['./new-cargo.component.css'],
})
export class NewCargoComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  public cargoFrom!: FormGroup;
  private fb = inject(FormBuilder);
  private cargoService = inject(CargoService);
  private departamentService = inject(DepartamentService);
  private dialogRef = inject(MatDialogRef);

  estadoFormulario: string = '';
  departamentos: Departamento[] = [];

  ngOnInit(): void {
    this.estadoFormulario = 'Agregar';
    this.getDepartamentos();
    this.cargoFrom = this.fb.group({
      descripcion: ['', Validators.required],
      codigo: ['', Validators.required],
      estado: ['', Validators.required],
      salario: ['', Validators.required],
      departamentoId: ['', Validators.required],
    });
    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    const data = {
      descripcion: this.cargoFrom.get('descripcion')?.value,
      codigo: this.cargoFrom.get('codigo')?.value,
      estado: this.cargoFrom.get('estado')?.value,
      salario: this.cargoFrom.get('salario')?.value,
      departamentoId: this.cargoFrom.get('departamentoId')?.value,
    };

    if (this.data != null) {
      //actualizar nuevo registro
      this.cargoService.update(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      //crear nuevo registro
      this.cargoService.save(data).subscribe(
        (data: any) => {
          console.log(data);
          this.dialogRef.close(1);
        },
        (error: any) => {
          console.error(error);
          this.dialogRef.close(2);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.cargoFrom.patchValue(data);
  }

  getDepartamentos() {
    this.departamentService.buscarTodos().subscribe(
      (data: any) => {
        this.departamentos = data.departamentoResponse.departamentos;
      },
      (error: any) => {
        console.log('Error al consultar departamentos en cargos');
      }
    );
  }
}

export interface Departamento {
  id: number;
  descripcion: String;
  codigo: String;
  estado: String;
}
