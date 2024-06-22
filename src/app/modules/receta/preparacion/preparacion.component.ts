import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
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
  private snackBar = inject(MatSnackBar); // Inyectar MatSnackBar

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
      this.buscarIngredientesPorPlato(this.data); // Buscar ingredientes del plato al iniciar
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
      cantidad: ['', Validators.required],
      unidad: [{ value: '', disabled: true }, Validators.required]
    }));
  }

  removeIngrediente(index: number): void {
    const ingrediente = this.ingredientesArray.at(index).value;
    this.preparacionService.eliminarIngrediente(this.idPlato, ingrediente.ingredienteId).subscribe(
      response => {
        this.snackBar.open('Ingrediente eliminado con éxito', 'Cerrar', { duration: 3000 });
        this.ingredientesArray.removeAt(index);
      },
      error => {
        if (error.status === 409) {
          console.error('Conflicto al eliminar el ingrediente:', error);
          this.snackBar.open('Conflicto: No se puede eliminar el ingrediente.', 'Cerrar', { duration: 5000 });
        } else {
          console.error('Error al eliminar el ingrediente:', error);
          this.snackBar.open('Error al eliminar el ingrediente', 'Cerrar', { duration: 3000 });
        }
      }
    );
  }

  llenarDatosReceta(data: any) {
    this.preparacionForm.patchValue({ nombreProducto: data.nombreProducto });

    data.preparaciones.forEach((prep: any) => {
      const ingrediente = this.ingredientes.find(ing => ing.id === prep.ingredienteId);
      const ingredienteUnidad = ingrediente ? ingrediente.unidad : '';

      this.ingredientesArray.push(this.fb.group({
        ingredienteId: [prep.ingredienteId, Validators.required],
        cantidad: [prep.cantidad, Validators.required],
        unidad: [{ value: ingredienteUnidad, disabled: true }]
      }));
    });
  }

  onIngredienteChange(index: number): void {
    const ingredienteControl = this.ingredientesArray.at(index).get('ingredienteId');
    const unidadControl = this.ingredientesArray.at(index).get('unidad');

    if (ingredienteControl && unidadControl) {
      const ingredienteId = ingredienteControl.value;
      const ingredienteSeleccionado = this.ingredientes.find(ing => ing.id === ingredienteId);

      if (ingredienteSeleccionado) {
        unidadControl.setValue(ingredienteSeleccionado.unidad);
      } else {
        unidadControl.setValue('');
      }
    }
  }

  onSave() {
    const ingredientes = this.preparacionForm.value.ingredientes;

    ingredientes.forEach((ingrediente: any) => {
      const data = {
        ingredienteId: ingrediente.ingredienteId,
        cantidad: ingrediente.cantidad,
        unidad: ingrediente.unidad,
        nombreProducto: this.nombreProducto,
        platoId: this.idPlato
      };

      this.preparacionService.crear(data).subscribe(
        response => {
          console.log('Ingrediente guardado:', response);
          this.snackBar.open('Ingrediente guardado con éxito', 'Cerrar', { duration: 3000 });
        },
        error => {
          if (error.status === 409) {
            console.error('Conflicto al guardar el ingrediente:', error);
            this.snackBar.open('Conflicto: No se puede crear o actualizar el plato.', 'Cerrar', { duration: 5000 });
          } else {
            console.error('Error al guardar el ingrediente:', error);
            this.snackBar.open('Error al guardar el ingrediente', 'Cerrar', { duration: 3000 });
          }
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
  unidad: string;
}

export interface Receta {
  id: number;
  nombre: String;
  pvp: number;
}
