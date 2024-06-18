import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { IngredienteService } from '../../shared/services/ingrediente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewIngredienteComponent } from '../new-ingrediente/new-ingrediente.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {
  private ingredienteService = inject(IngredienteService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  
  ngOnInit(): void {
    this.obtenerIngredientes();
  }

  displayedColumns: string[] = ['id', 'nombre', 'costo', 'cantidad', 'unidad', 'actions'];

  dataSource = new MatTableDataSource<IngredienteElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.obtenerIngredientes();
    }
    this.ingredienteService.buscarPorNombre(termino).subscribe((resp: any) => {
      this.processIngredienteResponse(resp);
    });
  }

  obtenerIngredientes(): void {
    this.ingredienteService.buscarTodos().subscribe(
      (data: any) => {
        this.processIngredienteResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processIngredienteResponse(resp: any) {
    const dataIngrediente: IngredienteElement[] = [];

    if (resp.metadata[0].code === '00') {
      let ingredienteList = resp.ingredienteResponse.ingredientes;

      ingredienteList.forEach((element: IngredienteElement) => {
        dataIngrediente.push(element);
      });

      this.dataSource.data = dataIngrediente;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  openIngredienteDialog() {
    const dialogRef = this.dialog.open(NewIngredienteComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Ingrediente agregado', 'Exito');
        this.obtenerIngredientes();
      } else if (result == 2) {
        this.openSnackBar(
          'Ingrediente no pudo ser agregado',
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

  edit(ingrediente: any) {
    const dialogRef = this.dialog.open(NewIngredienteComponent, {
      width: '700px',
      data: ingrediente,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Ingrediente actualizado', 'Exito');
        this.obtenerIngredientes();
      } else if (result == 2) {
        this.openSnackBar(
          'Ingrediente no pudo ser actualizado',
          'Error'
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { id: id, module: "ingrediente"},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Ingrediente eliminado', 'Exito');
        this.obtenerIngredientes();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al eliminar el ingrediente',
          'Error'
        );
      }
    });
  }
}
export interface IngredienteElement {
  id: number;
  codigo:string;
  nombre: string;
  unidad: string;
  cantidad: number;
  costo: number
}
