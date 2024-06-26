import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from 'src/app/modules/shared/services/employee.service';
import { NewEmployeeComponent } from '../new-employee/new-employee.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  private employeeService = inject(EmpleadoService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getEmployees();
  }

  displayedColumns: string[] = [
    'id',
    'cedula',
    'nombre',
    'apellidoPaterno',
    'estado',
    'actions',
  ];
  dataSource = new MatTableDataSource<EmployeeElement>();

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: any) => {
        this.processEmployeesResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processEmployeesResponse(resp: any) {

    const dataEmployee: EmployeeElement[] = [];

    if (resp.metadata[0].code === '00') {
      let employeeList = resp.empleadoResponse.empleados;

      employeeList.forEach((element: EmployeeElement) => {
        dataEmployee.push(element);
      });

      this.dataSource.data = dataEmployee;
      this.dataSource.paginator = this.paginator;
    } else {
      console.log('error: ');
    }
  }

  openEmployeeDialog() {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Empleado Agregado', 'Exito');
        this.getEmployees();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al guardar el empleado',
          'Error'
        );
      }
    });
  }

  edit(employee: any) {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '700px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Empleado Actualizado', 'Exito');
        this.getEmployees();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al actualizar el empleado',
          'Error'
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { id: id, module: "employee", estadoFormulario: 'Eliminar'},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Empleado Eliminado', 'Exito');
        this.getEmployees();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al eliminar el empleado',
          'Error'
        );
      }
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.getEmployees();
      return;
    }
    this.employeeService.getEmployeeByName(termino).subscribe(
      (resp: any) => {
          this.processEmployeesResponse(resp);
      }
    );
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

export interface EmployeeElement {
  id: number;
  tipoIdentificacion: string;
  cedula: string;
  usuario: string;
  estado: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  nacionalidad: string;
  estadoCivil: string;
  fechaIngreso: string;
  fechaSalida: string;
  fechaReingreso: string;
  gradoAcademico: string;
  titulo: string;
  salario: string;
  telefono: string;
  celular: string;
  provinciaId: string;
  ciudadCodigo: string;
  callePrincipal: string;
  calleSecundaria: string;
  correoPersonal: string;
  correoInstitucional: string;
  cargoId: string;
}
