import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { NewEmployeeComponent } from '../new-employee/new-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit{
  
  private employeeService = inject(EmployeeService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getEmployees();
  }

  displayedColumns: string[] = ['id', 'nombre', 'apellidoPaterno', 'actions'];
  dataSource = new MatTableDataSource<EmployeeElement>();
  

  getEmployees() : void{
    
    this.employeeService.getEmployees()
    .subscribe( (data:any) => {

      console.log("respuesta de empleados: ", data);
      this.processEmployeesResponse(data);

    }, (error: any) => {
      console.log("error: ", error);
    })
  }

  processEmployeesResponse(resp: any) {
    const dataEmployee: EmployeeElement[] = [];
  
    if (resp.metadata[0].code === "00") {
      let employeeList = resp.employeeResponse.employee;
  
      employeeList.forEach((element: EmployeeElement) => {
        dataEmployee.push(element);
      });

      this.dataSource.data = dataEmployee;
    } else {
      console.log("error: ");
    }
  }

  openEmployeeDialog(){
    const dialogRef = this.dialog.open(NewEmployeeComponent , {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if( result == 1){
        this.openSnackBar("Empleado Agregado", "Exitosa");
        this.getEmployees();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar el empleado", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 4000
    })

  }
  
  }

export interface EmployeeElement {
  id: number;
  nombre: string;
  apellidoPaterno: string;
}