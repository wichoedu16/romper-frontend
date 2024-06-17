import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecetaService } from '../../shared/services/receta.service';
import { NewRecetaComponent } from '../new-receta/new-receta.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { PreparacionComponent } from '../preparacion/preparacion.component';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
})
export class RecetaComponent implements OnInit {
  private recetaService = inject(RecetaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  public noResultsMessage = '';

  ngOnInit(): void {
    this.getRecetas();
  }

  displayedColumns: string[] = ['id', 'nombre', 'pvp', 'actions'];

  dataSource = new MatTableDataSource<RecetaElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getRecetas();
    }
    this.recetaService.obtenerPorNombre(termino).subscribe((resp: any) => {
      this.processRecetasResponse(resp);
    });
  }

  getRecetas(): void {
    this.recetaService.obtenerTodos().subscribe(
      (data: any) => {
        this.processRecetasResponse(data);
      },
      (error: any) => {
        console.log('ERRRRRRROR: ', error);
      }
    );
  }

  processRecetasResponse(resp: any) {
    const dataReceta: RecetaElement[] = [];

    if (resp.metadata[0].code === '00') {
      let recetaList = resp.platoResponse.platos;

      if (recetaList.length === 0) {
        this.noResultsMessage = 'No se encontraron resultados';
      } else {
        this.noResultsMessage = '';
        recetaList.forEach((element: RecetaElement) => {
          dataReceta.push(element);
        });

        this.dataSource.data = dataReceta;
        this.dataSource.paginator = this.paginator;
      }
    } else {
      console.log('ERRRRRROR: ');
    }
  }

  openRecetaDialog() {
    const dialogRef = this.dialog.open(NewRecetaComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Plato Agregado', 'Exito');
        this.getRecetas();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al guardar el plato', 'Error');
      }
    });
  }

  show(receta: any) {
    const dialogRef = this.dialog.open(PreparacionComponent, {
      width: '700px',
      data: receta,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Plato Actualizada', 'Exito');
        this.getRecetas();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al actualizar el plato',
          'Error'
        );
      }
    });
  }

  edit(receta: any) {
    const dialogRef = this.dialog.open(NewRecetaComponent, {
      width: '400px',
      data: receta,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Plato Actualizada', 'Exito');
        this.getRecetas();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al actualizar el plato',
          'Error'
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { id: id, module: 'receta' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Receta eliminada', 'Exito');
        this.getRecetas();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al eliminar la receta', 'Error');
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
}

export interface RecetaElement {
  id: number;
  nombre: string;
  pvp: bigint;
}
