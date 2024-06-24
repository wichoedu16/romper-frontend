import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorElement } from '../../proveedor/proveedor/proveedor.component';
import { IngredienteService } from '../../shared/services/ingrediente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewInventarioComponent } from '../new-inventario/new-inventario.component';
import { InventarioService } from '../../shared/services/inventario.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent implements OnInit {
  private inventarioService = inject(InventarioService);
  private ingredienteService = inject(IngredienteService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  proveedores: ProveedorElement[] = [];
  filtroForm!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'ingrediente',
    'fechaMovimiento',
    'cantidad',
    'tipo',
    'total',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      tipo: [''],
      nombreIngrediente: [''],
    });
    this.obtenerInventario();
  }

  obtenerInventario(): void {
    this.inventarioService.buscarTodos().subscribe(
      (data: any) => {
        this.dataSource.data = data.inventarioResponse.inventarios.map((element: any) => {
          element.ingrediente = element.ingrediente.nombre;
          element.fechaMovimiento = this.convertirFecha(element.fechaMovimiento);
          return element;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.log('Error al consultar el inventario');
      }
    );
  }

  processInventarioResponse(resp: any) {
    const dataInventario: InventarioElement[] = [];

    if (resp.metadata[0].code === '00') {
      let inventarioList = resp.inventarioResponse.inventarios;

      inventarioList.forEach((element: InventarioElement) => {
        element.ingrediente = element.ingrediente.nombre;
        element.fechaMovimiento = this.convertirFecha(element.fechaMovimiento as unknown as string);
        dataInventario.push(element);
      });

      this.dataSource.data = dataInventario;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  convertirFecha(fechaStr: string): Date {
    const [dia, mes, anioHora] = fechaStr.split('-');
    const [anio, hora] = anioHora.split(' ');
    return new Date(`${anio}-${mes}-${dia}T${hora}`);
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  nuevo() {
    const dialogRef = this.dialog.open(NewInventarioComponent, {
      width: '700px',
      data: { estadoFormulario: 'Agregar' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Ingrediente agregado', 'Exito');
        this.obtenerInventario();
      } else if (result == 2) {
        this.openSnackBar('No se puede agregar', 'Error');
      }
    });
  }

  exportarExcel() {
    this.ingredienteService.exportarExcel().subscribe(
      (data: any) => {
        let file = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement('a');
        anchor.download = 'ingredientes.xlsx';
        anchor.href = fileUrl;
        anchor.click();

        this.openSnackBar('Archivo descargado correctamente', 'Exitosa');
      },
      (error: any) => {
        this.openSnackBar('No se puede descargar', 'Error');
      }
    );
  }

  filtrarInventario() {
    const nombre = this.filtroForm.get('nombreIngrediente')?.value.toLowerCase();
    const tipo = this.filtroForm.get('tipo')?.value;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const matchFilter = [];
      const filterArray = filter.split('$');
      const customFilterNombre = filterArray[0] === '' || data.ingrediente.toLowerCase().includes(filterArray[0]);
      const customFilterTipo = filterArray[1] === '' || data.tipo === filterArray[1];
      matchFilter.push(customFilterNombre, customFilterTipo);
      return matchFilter.every(Boolean);
    };

    this.dataSource.filter = nombre + '$' + tipo;
  }
}

export interface InventarioElement {
  id: number;
  ingrediente: any;
  cantidad: number;
  tipo: string;
  total: number;
  fechaMovimiento: Date;  
}
