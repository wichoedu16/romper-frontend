import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredienteService } from '../../shared/services/ingrediente.service';
import { PreparacionService } from '../../shared/services/preparacion.service';

@Component({
  selector: 'app-preparacion',
  templateUrl: './preparacion.component.html',
  styleUrls: ['./preparacion.component.css'],
})
export class PreparacionComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  public preparacionForm!: FormGroup;
  private fb = inject(FormBuilder);
  private preparacionService = inject(PreparacionService);
  private ingredienteService = inject(IngredienteService);
  private dialogRef = inject(MatDialogRef);

  nombreProducto: string = '';
  idPlato: string = '';
  ingredientes: Ingrediente[] = [];

  ngOnInit(): void {
    this.obtenerIngredientes();
    this.preparacionForm = this.fb.group({
      ingredientes: this.fb.array([]) 
    });

    if (this.data != null) {
      this.llenarDatosReceta(this.data);
      this.nombreProducto = this.data.nombre;
      this.idPlato = this.data.id;
    }

    this.addIngrediente(); 
  }

  obtenerIngredientes() {
    this.ingredienteService.buscarTodos().subscribe(
      (data: any) => {
        this.ingredientes = data.ingredienteResponse.ingredientes;
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  get ingredientesArray(): FormArray {
    return this.preparacionForm.get('ingredientes') as FormArray;
  }

  addIngrediente(): void {
    this.ingredientesArray.push(this.fb.group({
      ingredienteId: ['', Validators.required],
      cantidad: ['', Validators.required]
    }));
  }

  removeIngrediente(index: number): void {
    this.ingredientesArray.removeAt(index);
  }

  llenarDatosReceta(data: any) {
    const ingredientes = data.ingredientes || [];
    this.preparacionForm.patchValue({ nombreProducto: data.nombreProducto });

    ingredientes.forEach((ing: any) => {
      this.ingredientesArray.push(this.fb.group({
        ingredienteId: [ing.ingrediente.id, Validators.required],
        cantidad: [ing.cantidad, Validators.required]
      }));
    });
  }

  onSave() {
    const ingredientes = this.preparacionForm.value.ingredientes;
  
    ingredientes.forEach((ingrediente: any) => {
      const data = {
        ingredienteId: ingrediente.ingredienteId,
        cantidad: ingrediente.cantidad,
        nombreProducto: this.nombreProducto,
        recetaId: this.idPlato
      };
  
      this.preparacionService.crear(data).subscribe(
        response => {
          console.log('Ingrediente guardado:', response);
        },
        error => {
          console.error('Error al guardar el ingrediente:', error);
        }
      );
    });
  
    // Cierra el diálogo después de intentar guardar todos los ingredientes
    this.dialogRef.close(1);
  }
  

  onCancel() {
    this.dialogRef.close(3);
  }
}

export interface Ingrediente {
  id: number;
  cantidad: string;
  costo: string;
  nombre: string;
  salario: any;
  departamento: any;
}

export interface Receta {
  id: number;
  nombre: String;
}
