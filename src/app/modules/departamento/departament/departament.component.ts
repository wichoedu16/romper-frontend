import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DepartamentService } from '../../shared/services/departament.service';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewDepartamentComponent } from '../new-departament/new-departament.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css'],
})
export class DepartamentComponent implements OnInit {
  private departamentService = inject(DepartamentService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getDepartaments();
  }

  displayedColumns: string[] = ['id', 'codigo', 'descripcion', 'estado', 'actions'];

  dataSource = new MatTableDataSource<DepartamentElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getDepartaments();
    }
    this.departamentService.buscarPorNombre(termino).subscribe((resp: any) => {
      this.processDepartamentsResponse(resp);
    });
  }

  getDepartaments(): void {
    this.departamentService.buscarTodos().subscribe(
      (data: any) => {
        this.processDepartamentsResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processDepartamentsResponse(resp: any) {
    const dataDepartament: DepartamentElement[] = [];

    if (resp.metadata[0].code === '00') {
      let departamentList = resp.departamentoResponse.departamentos;

      departamentList.forEach((element: DepartamentElement) => {
        dataDepartament.push(element);
      });

      this.dataSource.data = dataDepartament;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  openDepartamentDialog() {
    const dialogRef = this.dialog.open(NewDepartamentComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Departamento Agregado', 'Exito');
        this.getDepartaments();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al guardar el departamento',
          'Error'
        );
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

  edit(departament: any) {
    const dialogRef = this.dialog.open(NewDepartamentComponent, {
      width: '700px',
      data: departament,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Departamento Actualizado', 'Exito');
        this.getDepartaments();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al actualizar el departamento',
          'Error'
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { id: id, module: "departament"},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Departamento Eliminado', 'Exito');
        this.getDepartaments();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al eliminar el departamento',
          'Error'
        );
      }
    });
  }
}
export interface DepartamentElement {
  id: number;
  codigo:string;
  descripcion: string;
  estado: string;
}
