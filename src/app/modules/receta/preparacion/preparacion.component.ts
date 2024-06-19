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
  preparacion: Preparacion[] = [];

  ngOnInit(): void {
    this.obtenerIngredientes();

    this.preparacionForm = this.fb.group({
      ingredientes: this.fb.array([]) 
    });

    if (this.data != null) {
      this.nombreProducto = this.data.nombre;
      this.idPlato = this.data.id;
    }
  }
  
  buscarIngredientesPorPlato(data: any) {
    this.preparacionService.buscarPorPlatoId(data.id).subscribe(
      (response: any) => {
        this.preparacion = response.preparacionResponse.preparaciones;
        this.llenarDatosReceta(response.preparacionResponse);
      },
      (error: any) => {
        console.error('ERROR EN PLATO: ', error);
      }
    );
  }

  obtenerIngredientes() {
    this.ingredienteService.buscarTodos().subscribe(
      (response: any) => {
        this.ingredientes = response.ingredienteResponse.ingredientes;
        this.buscarIngredientesPorPlato(this.data); 
        console.log(this.data)
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
    this.preparacionForm.patchValue({ nombreProducto: data.nombreProducto });

    data.preparaciones.forEach((prep: any) => {
      const ingrediente = this.ingredientes.find(ing => ing.id === prep.ingrediente.id);
      const ingredienteNombre = ingrediente ? ingrediente.nombre : '';
      
      console.log(prep)
     
      this.ingredientesArray.push(this.fb.group({
        ingredienteId: [prep.ingredienteId, Validators.required],
        cantidad: [prep.cantidad, Validators.required],
        nombre: [ingredienteNombre]
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
        platoId: this.idPlato
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

    this.dialogRef.close(1);
  }

  onCancel() {
    this.dialogRef.close(3);
  }
}

export interface Preparacion {
  plato: string;
  ingrediente: string;
  cantidad: string;
}

export interface Ingrediente {
  id: number;
  cantidad: string;
  costo: string;
  nombre: string;
}

export interface Receta {
  id: number;
  nombre: String;
  pvp: number;
}
