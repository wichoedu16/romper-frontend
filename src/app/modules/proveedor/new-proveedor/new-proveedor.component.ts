import { Component, OnInit, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../shared/services/proveedor.service';

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css'],
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
      nombreProveedor: ['', Validators.required],
      telefonoProveedor: ['', Validators.required],
      banco: ['', ],
      tipoCuenta: ['', ],
      numeroCuenta: ['', ],
      identificacion: ['', ],
      nombreContacto: ['', ],
      telefonoContacto: ['', ],
      correoContacto: ['', ],
    });
    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  grabar() {
    const data = {
      empresa: this.proveedorForm.get('empresa')?.value,
      nombreProveedor: this.proveedorForm.get('nombreProveedor')?.value,
      telefonoProveedor: this.proveedorForm.get('telefonoProveedor')?.value,
      banco: this.proveedorForm.get('banco')?.value,
      tipoCuenta: this.proveedorForm.get('tipoCuenta')?.value,
      numeroCuenta: this.proveedorForm.get('numeroCuenta')?.value,
      identificacion: this.proveedorForm.get('identificacion')?.value,
      nombreContacto: this.proveedorForm.get('nombreContacto')?.value,
      telefonoContacto: this.proveedorForm.get('telefonoContacto')?.value,
      correoContacto: this.proveedorForm.get('correoContacto')?.value,
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

  cancelar() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.proveedorForm.patchValue(data);
  }
}
