import { Component, OnInit, inject } from '@angular/core';
import { IngredienteService } from '../../shared/services/ingrediente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../shared/services/proveedor.service';
import { ProveedorElement } from '../../proveedor/proveedor/proveedor.component';

@Component({
  selector: 'app-new-ingrediente',
  templateUrl: './new-ingrediente.component.html',
  styleUrls: ['./new-ingrediente.component.css'],
})
export class NewIngredienteComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  public ingredienteForm!: FormGroup;
  private fb = inject(FormBuilder);
  private proveedorService = inject(ProveedorService);
  private ingredienteService = inject(IngredienteService);
  private dialogRef = inject(MatDialogRef);

  estadoFormulario: string = '';

  proveedores: ProveedorElement[] = [];

  ngOnInit(): void {
    this.estadoFormulario = this.data?.estadoFormulario ;
    this.obtenerProveedores();
    this.ingredienteForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      costo: ['', Validators.required],
      unidad: ['', Validators.required],
      proveedorId: ['', Validators.required],
    });
    if (this.data?.ingrediente) {
      this.updateForm(this.data.ingrediente);
    }
  }

  grabar() {
    const data = {
      nombre: this.ingredienteForm.get('nombre')?.value,
      cantidad: this.ingredienteForm.get('cantidad')?.value,
      costo: this.ingredienteForm.get('costo')?.value,
      unidad: this.ingredienteForm.get('unidad')?.value,
      proveedorId: this.ingredienteForm.get('proveedorId')?.value,
    };
    console.log(this.estadoFormulario);
    if (this.data != null && this.estadoFormulario != 'Nuevo') {
      this.ingredienteService.actualizar(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      this.ingredienteService.crear(data).subscribe(
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

  cancelar() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.ingredienteForm.patchValue(data);
  }

  obtenerProveedores() {
    this.proveedorService.buscarTodos().subscribe(
      (data: any) => {
        this.proveedores = data.proveedorResponse.proveedores;
      },
      (error: any) => {
        console.log('Error al consultar proveedores en ingredientes');
      }
    );
  }
}