import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadoService } from '../../services/employee.service';
import { DepartamentService } from '../../services/departament.service';
import { CargoService } from '../../services/cargo.service';
import { RecetaService } from '../../services/receta.service';
import { IngredienteService } from '../../services/ingrediente.service';
import { ProveedorService } from '../../services/proveedor.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  private employeeService = inject(EmpleadoService);
  private cargoService = inject(CargoService);
  private departamentService = inject(DepartamentService);
  private recetaService = inject(RecetaService);
  private proveedorService = inject(ProveedorService);
  private ingredienteService = inject(IngredienteService);
  private ventaService = inject(VentaService);

  estadoFormulario: string = '';

  ngOnInit(): void {
    if (this.data) {
      this.estadoFormulario = this.data.estadoFormulario;
      console.log('Datos recibidos:', this.data); // Verifica los datos recibidos
      console.log('Action Type:', this.estadoFormulario); // Verifica el actionType
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmAction(): void {
    console.log('Acción confirmada:', this.estadoFormulario, this.data); // Verifica el actionType y los datos
    if (this.estadoFormulario === 'Eliminar') {
      this.eliminar();
    } else if (this.estadoFormulario === 'Anular') {
      this.anular();
    }
  }

  anular(): void {
    console.log('Anulando:', this.data?.id);
    if (this.data?.module === 'venta') {
      this.ventaService.actualizar(this.data, this.data.id).subscribe(
        () => this.dialogRef.close(true),
        () => this.dialogRef.close(false)
      );
    } else {
      console.error('Módulo no soportado para anulación:', this.data?.module);
      this.dialogRef.close(false);
    }
  }

  eliminar(): void {
    const serviceMapping: { [key: string]: any } = {
      'employee': this.employeeService,
      'departament': this.departamentService,
      'cargo': this.cargoService,
      'receta': this.recetaService,
      'ingrediente': this.ingredienteService,
      'proveedor': this.proveedorService
    };

    const service = serviceMapping[this.data?.module];
    console.log('Eliminando con servicio:', service); // Verifica el servicio

    if (service) {
      service.eliminar(this.data.id).subscribe(
        () => this.dialogRef.close(true),
        (error: any) => {
          console.error('Error al eliminar:', error); // Verifica el error
          this.dialogRef.close(false);
        }
      );
    } else {
      console.error('Servicio no encontrado para módulo:', this.data?.module);
      this.dialogRef.close(false);
    }
  }
}
