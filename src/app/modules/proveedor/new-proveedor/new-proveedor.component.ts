import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../shared/services/proveedor.service';

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css']
})
export class NewProveedorComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  public proveedorForm!: FormGroup;
  private fb = inject(FormBuilder);
  private proveedorService = inject(ProveedorService);
  private dialogRef = inject(MatDialogRef);

  estadoFormulario: string = '';

  ngOnInit(): void {
    this.estadoFormulario = 'Agregar';

    this.proveedorForm = this.fb.group({
      empresa: ['', Validators.required],
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
    });
    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    const data = {
      empresa: this.proveedorForm.get('empresa')?.value,
      nombre: this.proveedorForm.get('nombre')?.value,
      contacto: this.proveedorForm.get('contacto')?.value,
    };

    if (this.data != null) {
      //actualizar nuevo registro
      this.proveedorService.actualizar(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      //crear nuevo registro
      this.proveedorService.crear(data).subscribe(
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
    this.proveedorForm.patchValue(data);
  }
}
