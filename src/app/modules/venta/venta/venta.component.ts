import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { VentaService } from '../../shared/services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewVentaComponent } from '../new-venta/new-venta.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers: [DatePipe]
})
export class VentaComponent implements OnInit {
  esAdministrador: any;
  public dateFormatter = inject(DatePipe);
  private ventaService = inject(VentaService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  public filtroForm!: FormGroup;
  private fb = inject(FormBuilder);

  public totalVentas: number | undefined; // Variable para almacenar el total de ventas filtradas

  ngOnInit() {
    this.filtroForm = this.fb.group({
      fechaDesde: [''],
      fechaHasta: [''],
      vendedor: ['']
    });

    this.buscarVentas();
  }

  displayedColumns: string[] = ['id', 'plato', 'cantidad', 'precio', 'total', 'fechaVenta'];

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
        element.plato = element.plato.nombre;
        const fecha = parseDateString(element.fechaVenta as unknown as string);
        element.fechaVenta = fecha ? this.dateFormatter.transform(fecha, 'dd-MM-yyyy')! : '';
        dataVenta.push(element);
      });

      this.dataSource.data = dataVenta;
      this.dataSource.paginator = this.paginator;
      
      // Calcular el total de ventas
      this.totalVentas = dataVenta.reduce((total, venta) => total + venta.total, 0);
    
    } else {
      console.log('error: ');
    }
  }

  filtrarVentas() {
    let fechaDesde = this.filtroForm.get('fechaDesde')?.value;
    let fechaHasta = this.filtroForm.get('fechaHasta')?.value;

    // Transformar las fechas al formato 'dd-MM-yyyy'
    fechaDesde = this.dateFormatter.transform(fechaDesde, 'dd-MM-yyyy');
    fechaHasta = this.dateFormatter.transform(fechaHasta, 'dd-MM-yyyy');

    // Verificar si las fechas están vacías
    if (!fechaDesde) {
      fechaDesde = this.dateFormatter.transform(new Date(), 'dd-MM-yyyy');
    }

    if (!fechaHasta) {
      fechaHasta = this.dateFormatter.transform(new Date(), 'dd-MM-yyyy');
    }

    this.ventaService.buscarPorFechas(fechaDesde, fechaHasta).subscribe(
      (data: any) => {
        this.processVentaResponse(data);
      },
      (error: any) => {
        console.error('Error al buscar ventas:', error);
      }
    );
  }

  openVentaDialog() {
    const dialogRef = this.dialog.open(NewVentaComponent, {
      width: '750px'
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

  bajarReporteVentas() {
    this.ventaService.exportarExcel().subscribe((data: any) => {
      let file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let fileUrl = URL.createObjectURL(file);
      var anchor = document.createElement("a");
      anchor.download = "ingredientes.xlsx";
      anchor.href = fileUrl;
      anchor.click();

      this.openSnackBar("Archivo descargado correctamente", "Exitosa");
    }, (error: any) => {
      this.openSnackBar("No se puede descargar", "Error");
    });
  }
}

export interface VentaElement {
  id: number;
  plato: any;
  cantidad: number;
  precio: number;
  total: number;
  fechaVenta: string;  // Cambia el tipo de Date a string para almacenar la fecha formateada
}

function parseDateString(dateString: string): Date | null {
  const [day, month, year] = dateString.split('-').map(part => parseInt(part, 10));
  if (!day || !month || !year) {
    return null;
  }
  return new Date(year, month - 1, day);
}
