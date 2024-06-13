import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecetaService } from '../../shared/services/receta.service';

@Component({
  selector: 'app-new-receta',
  templateUrl: './new-receta.component.html',
  styleUrls: ['./new-receta.component.css']
})
export class NewRecetaComponent implements OnInit{

  public data = inject(MAT_DIALOG_DATA);
  public recetaForm!: FormGroup;
  private fb = inject(FormBuilder);
  private recetaService = inject(RecetaService);
  private dialogRef = inject(MatDialogRef);

  estadoFormulario: string = '';

  ngOnInit(): void {
    this.estadoFormulario = 'Nuevo';
    this.recetaForm = this.fb.group({
      nombre: ['', Validators.required],
      pvp: ['', Validators.required]
    });
    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    const data = {
      nombre: this.recetaForm.get('nombre')?.value,
      pvp: this.recetaForm.get('pvp')?.value
    };

    if (this.data != null) {
      //actualizar nuevo registro
      this.recetaService.actualizar(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      //crear nuevo registro
      this.recetaService.crear(data).subscribe(
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
    this.recetaForm.patchValue(data);
  }

}
