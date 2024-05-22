import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit{

  public employeeForm!: FormGroup;
  private fb = inject(FormBuilder)
  private employeeService= inject(EmployeeService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";

  ngOnInit(): void {

    console.log(this.data);
    this.estadoFormulario = "Agregar";
    
    this.employeeForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required]
    })

    if (this.data != null ){
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar";
    }
  }

  onSave(){

    let data = {
      nombre: this.employeeForm.get('nombre')?.value,
      apellidoPaterno: this.employeeForm.get('apellidoPaterno')?.value
    }

    if (this.data != null ){
      //update registry
      this.employeeService.updateEmployee(data, this.data.id)
              .subscribe( (data: any) =>{
                this.dialogRef.close(1);
              }, (error:any) =>{
                this.dialogRef.close(2);
              })
    } else {
      //create new registry
      this.employeeService.saveEmployee(data)
          .subscribe( (data : any) => {
            console.log(data);
            this.dialogRef.close(1);
          }, (error: any) => {
            console.error(error)
            this.dialogRef.close(2);
          })
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }


  updateForm(data: any){
    this.employeeForm = this.fb.group( {
      nombre: [data.nombre, Validators.required],
      apellidoPaterno: [data.apellidoPaterno, Validators.required]
    });

  }

}
