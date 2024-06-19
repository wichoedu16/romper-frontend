import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { VentaService } from '../../shared/services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../shared/services/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewVentaComponent } from '../new-venta/new-venta.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})

export class VentaComponent implements OnInit{
  esAdministrador : any;
  private ventaService = inject(VentaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private util = inject(UtilService);

  ngOnInit(): void {
    this.esAdministrador = this.util.validarAdministrador();
  }
  displayedColumns: string[] = ['id', 'plato', 'cantidad', 'precio', 'fecha'];

  dataSource = new MatTableDataSource<VentaElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  buscarVentas(): void {
    this.ventaService.buscarTodos().subscribe(
      (data: any) => {
        this.processVentaResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processVentaResponse(resp: any) {
    const dataVenta: VentaElement[] = [];

    if (resp.metadata[0].code === '00') {
      let ventaLista = resp.ventaResponse.ventas;

      ventaLista.forEach((element: VentaElement) => {
        dataVenta.push(element);
      });

      this.dataSource.data = dataVenta;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  openVentaDialog() {
    const dialogRef = this.dialog.open(NewVentaComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Venta creada', 'Exito');
        this.buscarVentas();
      } else if (result == 2) {
        this.openSnackBar('Venta no pudo ser creada', 'Error');
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

export interface VentaElement {
  id: number;
  plato: string;
  cantidad: number
  precio: number;
  fecha: any;
}
