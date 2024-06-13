import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartamentService } from '../../shared/services/departament.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-departament',
  templateUrl: './new-departament.component.html',
  styleUrls: ['./new-departament.component.css'],
})
export class NewDepartamentComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  public departamentForm!: FormGroup;
  private fb = inject(FormBuilder);
  private departamentService = inject(DepartamentService);
  private dialogRef = inject(MatDialogRef);

  estadoFormulario: string = '';

  ngOnInit(): void {
    this.estadoFormulario = 'Agregar';

    this.departamentForm = this.fb.group({
      descripcion: ['', Validators.required],
      codigo: ['', Validators.required],
      estado: ['', Validators.required],
    });
    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    const data = {
      descripcion: this.departamentForm.get('descripcion')?.value,
      codigo: this.departamentForm.get('codigo')?.value,
      estado: this.departamentForm.get('estado')?.value,
    };

    if (this.data != null) {
      //actualizar nuevo registro
      this.departamentService.actualizar(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      //crear nuevo registro
      this.departamentService.crear(data).subscribe(
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
    this.departamentForm.patchValue(data);
  }
}
