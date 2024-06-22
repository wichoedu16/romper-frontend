import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { IngredienteService } from '../../shared/services/ingrediente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewIngredienteComponent } from '../new-ingrediente/new-ingrediente.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProveedorElement } from '../../proveedor/proveedor/proveedor.component';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {
  private ingredienteService = inject(IngredienteService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  
  proveedores: ProveedorElement[] = [];

  ngOnInit(): void {
    this.obtenerIngredientes();
  }

  displayedColumns: string[] = ['id', 'proveedor', 'nombre', 'unidad', 'actions'];

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
        element.proveedor = element.proveedor.nombreProveedor
        dataIngrediente.push(element);
      });

      this.dataSource.data = dataIngrediente;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  nuevo() {
    const dialogRef = this.dialog.open(NewIngredienteComponent, {
      width: '500px',
      data: { estadoFormulario: 'Nuevo'}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Ingrediente creado', 'Exito');
        this.obtenerIngredientes();
      } else if (result == 2) {
        this.openSnackBar('Ingrediente no pudo ser creado', 'Error' );
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

  agregar(ingrediente: any) {
    const dialogRef = this.dialog.open(NewIngredienteComponent, {
      width: '700px',
      data: {ingrediente, estadoFormulario: 'Agregar'}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Ingrediente agregado', 'Exito');
        this.obtenerIngredientes();
      } else if (result == 2) {
        this.openSnackBar('No se puede agregar', 'Error');
      }
    });
  }

  editar(ingrediente: any) {
    const dialogRef = this.dialog.open(NewIngredienteComponent, {
      width: '700px',
      data: {ingrediente, estadoFormulario: 'Editar '}
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

  eliminar(id: any) {
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

  exportarExcel(){
    this.ingredienteService.exportarExcel().subscribe((data:any) =>{
      let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      let fileUrl = URL.createObjectURL(file);
      var anchor = document.createElement("a");
      anchor.download = "ingredientes.xlsx";
      anchor.href = fileUrl;
      anchor.click();

      this.openSnackBar("Archivo descargado correctamente", "Exitosa");
    }, (error: any)  =>{
      this.openSnackBar("No se puede descargar", "Error");
    }
    )
  }
  
}
export interface IngredienteElement {
  id: number;
  codigo:string;
  nombre: string;
  unidad: string;
  cantidad: number;
  costo: number
  proveedor: any;
}
