import { Component, OnInit, inject } from '@angular/core';
import { IngredienteService } from '../../shared/services/ingrediente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../shared/services/proveedor.service';

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

  proveedores: Proveedor[] = [];

  ngOnInit(): void {
    this.estadoFormulario = 'Agregar';
    this.obtenerProveedores();
    this.ingredienteForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      costo: ['', Validators.required],
      pvp: ['', Validators.required],
      unidad: ['', Validators.required],
      proveedorId: ['', Validators.required],
    });
    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    const data = {
      nombre: this.ingredienteForm.get('nombre')?.value,
      cantidad: this.ingredienteForm.get('cantidad')?.value,
      costo: this.ingredienteForm.get('costo')?.value,
      pvp: this.ingredienteForm.get('pvp')?.value,
      unidad: this.ingredienteForm.get('unidad')?.value,
      proveedorId: this.ingredienteForm.get('proveedorId')?.value,
    };

    if (this.data != null) {
      //actualizar nuevo registro
      this.ingredienteService.actualizar(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      //crear nuevo registro
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

  onCancel() {
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

export interface Proveedor {
  id: number;
  empresa: String;
  nombre: String;
}
