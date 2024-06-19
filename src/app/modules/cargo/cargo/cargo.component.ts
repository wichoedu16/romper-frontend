import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { CargoService } from '../../shared/services/cargo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewCargoComponent } from '../new-cargo/new-cargo.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
})
export class CargoComponent implements OnInit {
  private cargoService = inject(CargoService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getCargos();
  }
  displayedColumns: string[] = ['id', 'departamento' ,'descripcion', 'codigo', 'estado','actions'];

  dataSource = new MatTableDataSource<CargoElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getCargos();
    }
    this.cargoService.getByName(termino).subscribe((resp: any) => {
      this.processCargosResponse(resp);
    },
    (error: any) => {
      console.log('error: ', error);
    });
  }

  getCargos(): void {
    this.cargoService.getAll().subscribe(
      (data: any) => {
        this.processCargosResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processCargosResponse(resp: any) {
    const dataCargo: CargoElement[] = [];

    if (resp.metadata[0].code === '00') {
      let cargoList = resp.cargoResponse.cargos;

      cargoList.forEach((element: CargoElement) => {
        element.departamento = element.departamento.descripcion;
        dataCargo.push(element);    
      });

      this.dataSource.data = dataCargo;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  openCargoDialog() {
    const dialogRef = this.dialog.open(NewCargoComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('cargo Agregado', 'Exito');
        this.getCargos();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al guardar el cargoo', 'Error');
      }
    });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  edit(cargo: any) {
    const dialogRef = this.dialog.open(NewCargoComponent, {
      width: '700px',
      data: cargo,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cargo Actualizado', 'Exito');
        this.getCargos();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al actualizar el cargo',
          'Error'
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { id: id, module: 'cargo' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cargo eliminado', 'Exito');
        this.getCargos();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al eliminar el cargo', 'Error');
      }
    });
  }
}
export interface CargoElement {
  id: number;
  descripcion: string;
  codigo: string;
  estado: string;
  salario: any;
  departamento: any;
}
