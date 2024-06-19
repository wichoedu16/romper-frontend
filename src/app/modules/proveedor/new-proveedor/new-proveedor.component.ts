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
      //datos de pago
      banco: ['', Validators.required],
      numerCuenta: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      nombreCuenta: ['', Validators.required],
      cedulaCuenta: ['', Validators.required],
      correoCuenta: [''],
      telefonoCuenta: [''],
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
      banco: this.proveedorForm.get('contacto')?.value,
      numerCuenta: this.proveedorForm.get('numeroCuenta')?.value,
      tipoCuenta: this.proveedorForm.get('tipoCuenta')?.value,
      nombreCuenta: this.proveedorForm.get('nombreCuenta')?.value,
      cedulaCuenta: this.proveedorForm.get('cedulaCuenta')?.value,
      correoCuenta: this.proveedorForm.get('correoCuenta')?.value,
      telefonoCuenta: this.proveedorForm.get('telefonoCuenta')?.value,
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
