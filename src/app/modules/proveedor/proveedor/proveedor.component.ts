import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProveedorService } from '../../shared/services/proveedor.service';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { NewProveedorComponent } from '../new-proveedor/new-proveedor.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
})
export class ProveedorComponent implements OnInit {
  esAdministrador : any;
  private proveedorService = inject(ProveedorService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private util = inject(UtilService);

  ngOnInit(): void {
    this.buscarProveedores();
    this.esAdministrador = this.util.validarAdministrador();
  }
  displayedColumns: string[] = ['id', 'empresa', 'nombreProveedor', 'telefonoProveedor', 'actions'];

  dataSource = new MatTableDataSource<ProveedorElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.buscarProveedores();
    }
    this.proveedorService.buscarPorNombre(termino).subscribe((resp: any) => {
      this.processPoveedorResponse(resp);
    });
  }

  buscarProveedores(): void {
    this.proveedorService.buscarTodos().subscribe(
      (data: any) => {
        this.processPoveedorResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processPoveedorResponse(resp: any) {
    const dataDepartament: ProveedorElement[] = [];

    if (resp.metadata[0].code === '00') {
      let proveedorList = resp.proveedorResponse.proveedores;

      proveedorList.forEach((element: ProveedorElement) => {
        dataDepartament.push(element);
      });

      this.dataSource.data = dataDepartament;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  abirDialogo() {
    const dialogRef = this.dialog.open(NewProveedorComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Proveedor creado', 'Exito');
        this.buscarProveedores();
      } else if (result == 2) {
        this.openSnackBar('Proveedor no pudo ser creado', 'Error');
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

  edit(proveedor: any) {
    const dialogRef = this.dialog.open(NewProveedorComponent, {
      width: '700px',
      data: proveedor,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Proveedor actualizado', 'Exito');
        this.buscarProveedores();
      } else if (result == 2) {
        this.openSnackBar('Proveedor no pudo ser actualizado', 'Error');
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { id: id, module: 'proveedor' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Proveedor eliminado', 'Exito');
        this.buscarProveedores();
      } else if (result == 2) {
        this.openSnackBar('Proveedor no pudo ser eliminado', 'Error');
      }
    });
  }
}

export interface ProveedorElement {
  id: number;
  empresa: string;
  nombreProveedor: string;
  telefonoProveedor: string;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  identificacion: string;
  nombreContacto: string;
  telefonoContacto: string;
  correoContacto: string;
}
