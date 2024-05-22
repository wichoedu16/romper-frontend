import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';

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
    
  }

}

export interface EmployeeElement {
  id: number;
  nombre: string;
  apellidoPaterno: string;
}