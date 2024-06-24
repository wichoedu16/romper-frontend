import { Component, inject, OnInit } from '@angular/core';
import { IngredienteElement } from '../ingrediente/ingrediente.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredienteService } from '../../shared/services/ingrediente.service';
import { InventarioService } from '../../shared/services/inventario.service';

@Component({
  selector: 'app-new-inventario',
  templateUrl: './new-inventario.component.html',
  styleUrls: ['./new-inventario.component.css'],
})
export class NewInventarioComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  public inventarioForm!: FormGroup;
  private fb = inject(FormBuilder);
  private ingredienteService = inject(IngredienteService);
  private inventarioService = inject(InventarioService);
  private dialogRef = inject(MatDialogRef<NewInventarioComponent>);

  estadoFormulario: string = '';
  ingredientes: IngredienteElement[] = [];

  ngOnInit(): void {
    this.estadoFormulario = this.data?.estadoFormulario;
    this.obtenerIngredientes();
    this.inventarioForm = this.fb.group({
      tipo: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      ingredienteId: [{ value: '', disabled: this.data?.ingrediente ? true : false }, Validators.required],
      ingredienteNombre: [{ value: '', disabled: true }],
    });

    if (this.data?.ingrediente) {
      this.estadoFormulario = `${this.data?.estadoFormulario} ${this.data.ingrediente.nombre}`;
      this.updateForm(this.data.ingrediente);
    }
  }

  grabar() {
    if (this.inventarioForm.invalid) {
      this.inventarioForm.markAllAsTouched();
      return;
    }

    const data = {
      tipo: this.inventarioForm.get('tipo')?.value,
      cantidad: this.inventarioForm.get('cantidad')?.value,
      ingredienteId: this.data?.ingrediente ? this.data.ingrediente.id : this.inventarioForm.get('ingredienteId')?.value,
    };

    this.inventarioService.crear(data).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close(1);
      },
      (error: any) => {
        console.error(error);
        this.dialogRef.close(2);
      }
    );
  }

  cancelar() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.inventarioForm.patchValue({
      ingredienteId: data.id,
      ingredienteNombre: data.nombre,
      cantidad: 1,
    });
  }

  obtenerIngredientes() {
    this.ingredienteService.buscarTodos().subscribe(
      (response: any) => {
        this.ingredientes = response.ingredienteResponse.ingredientes;
      },
      (error: any) => {
        console.log('Error al consultar ingredientes en inventario');
      }
    );
  }
}
