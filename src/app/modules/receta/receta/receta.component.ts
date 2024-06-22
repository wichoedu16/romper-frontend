import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecetaService } from '../../shared/services/receta.service';
import { NewRecetaComponent } from '../new-receta/new-receta.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { PreparacionComponent } from '../preparacion/preparacion.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css'],
})
export class RecetaComponent implements OnInit {
  esAdministrador: any;
  private recetaService = inject(RecetaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private util = inject(UtilService);

  public noResultsMessage = '';
  dataSource = new MatTableDataSource<RecetaElement>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'nombre', 'pvp', 'estado', 'actions'];

  ngOnInit(): void {
    this.getRecetas();
    this.esAdministrador = this.util.validarAdministrador();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getRecetas();
    }
    this.recetaService.obtenerPorNombre(termino).subscribe(
      (resp: any) => {
        this.processRecetasResponse(resp);
      },
      (error: any) => {
        this.handleError(error, 'Error al buscar recetas');
      }
    );
  }

  getRecetas(): void {
    this.recetaService.obtenerTodos().subscribe(
      (data: any) => {
        this.processRecetasResponse(data);
      },
      (error: any) => {
        this.handleError(error, 'Error al consultar recetas');
      }
    );
  }

  processRecetasResponse(resp: any) {
    const dataReceta: RecetaElement[] = [];

    if (resp.metadata[0].code === '00') {
      let recetaList = resp.platoResponse.platos;

      if (!this.esAdministrador) {
        recetaList = recetaList.filter((element: RecetaElement) => element.estado === 'A');
      }

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
      this.handleError(null, 'Error en la respuesta del servidor');
    }
  }

  abrirDialogo() {
    const dialogRef = this.dialog.open(NewRecetaComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Plato Agregado', 'Éxito');
        this.getRecetas();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al guardar el plato', 'Error');
      }
    });
  }

  show(receta: RecetaElement) {
    const dialogRef = this.dialog.open(PreparacionComponent, {
      width: '800px',
      data: receta,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Plato Actualizado', 'Éxito');
        this.getRecetas();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al actualizar el plato', 'Error');
      }
    });
  }

  edit(receta: RecetaElement) {
    const dialogRef = this.dialog.open(NewRecetaComponent, {
      width: '400px',
      data: receta,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Plato Actualizado', 'Éxito');
        this.getRecetas();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al actualizar el plato', 'Error');
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { id: id, module: 'receta' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar('Receta eliminada', 'Éxito');
        this.getRecetas();
      } else if (result === 2) {
        this.openSnackBar('Se produjo un error al eliminar la receta', 'Error');
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  handleError(error: any, message: string) {
    console.error(message, error);
    this.openSnackBar(message, 'Error');
  }
}

export interface RecetaElement {
  id: number;
  nombre: string;
  pvp: number;
  estado: string;
}
