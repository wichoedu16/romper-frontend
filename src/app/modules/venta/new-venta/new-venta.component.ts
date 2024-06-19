import { Component, OnInit, inject } from '@angular/core';
import { RecetaService } from '../../shared/services/receta.service';
import { VentaService } from '../../shared/services/venta.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Receta } from '../../receta/preparacion/preparacion.component';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.css']
})
export class NewVentaComponent implements OnInit {

  public data = inject(MAT_DIALOG_DATA);
  public ventaForm!: FormGroup;
  private fb = inject(FormBuilder);
  private ventaService = inject(VentaService);
  private platoService = inject(RecetaService);
  private dialogRef = inject(MatDialogRef);

  platos: Receta[] = [];

  ngOnInit(): void {
    this.obtenerPlatos();
    this.ventaForm = this.fb.group({
      platos: this.fb.array([])
    });
  }

  get platosArray(): FormArray {
    return this.ventaForm.get('platos') as FormArray;
  }

  obtenerPlatos(){
    this.platoService.obtenerTodos().subscribe(
      (data: any) => {
        this.platos = data.platoResponse.platos;
      },
      (error: any) => {
        console.log('Error al consultar platos en ventas');
      }
    );
  }

  addPlato(): void {
    const platoForm = this.fb.group({
      platoId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      total: [{ value: '', disabled: true }]
    });

    platoForm.get('platoId')!.valueChanges.subscribe(platoId => {
      this.calculateTotal(platoForm);
    });

    platoForm.get('cantidad')!.valueChanges.subscribe(() => {
      this.calculateTotal(platoForm);
    });

    this.platosArray.push(platoForm);
  }

  removePlato(index: number): void {
    this.platosArray.removeAt(index);
  }

  calculateTotal(platoForm: FormGroup): void {
    const cantidad = platoForm.get('cantidad')!.value;
    const platoId = platoForm.get('platoId')!.value;
    const selectedPlato = this.platos.find(plato => plato.id === platoId);
    if (cantidad && selectedPlato) {
      const total = cantidad * selectedPlato.pvp;
      platoForm.get('total')!.setValue(total);
    }
  }

  onSave() {
    if (this.ventaForm.valid) {
      const formData = this.ventaForm.getRawValue();
      // Adjust the payload if needed before sending to the backend
      this.ventaService.crear(formData).subscribe(
        response => {
          console.log('Venta creada:', response);
          this.dialogRef.close(formData);
        },
        error => {
          console.error('Error al crear la venta:', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}