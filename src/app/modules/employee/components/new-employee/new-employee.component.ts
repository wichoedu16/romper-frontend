import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
})
export class NewEmployeeComponent implements OnInit {
  public dateFormatter = inject(DatePipe);
  public data = inject(MAT_DIALOG_DATA);
  public employeeForm!: FormGroup;
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private dialogRef = inject(MatDialogRef);
  

  estadoFormulario: string = '';

  ngOnInit(): void {
    this.estadoFormulario = 'Agregar';

    this.employeeForm = this.fb.group({
      cedula: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      sexo: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      gradoAcademico: ['', Validators.required],
      titulo: ['', Validators.required],
      telefono: [''],
      celular: ['', Validators.required],
      callePrincipal: ['', Validators.required],
      calleSecundaria: [''],
      correoPersonal: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      fechaReingreso: [''],
      fechaSalida: [''],
      salario: ['', Validators.required],
      usuario: ['', Validators.required],
      estado: ['', Validators.required],
      correoInstitucional: ['', Validators.required],
    });

    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    const fechaIngreso = this.employeeForm.get('fechaIngreso')?.value;
    const fechaNacimiento = this.employeeForm.get('fechaNacimiento')?.value;
    const fechaSalida = this.employeeForm.get('fechaSalida')?.value;

    const formattedFIngreso = fechaIngreso ? this.dateFormatter.transform(fechaIngreso, 'yyyy-MM-dd') : null;
    const formattedFNacimiento = fechaNacimiento ? this.dateFormatter.transform(fechaNacimiento, 'yyyy-MM-dd') : null;
    const formattedFSalida = fechaSalida ? this.dateFormatter.transform(fechaSalida, 'yyyy-MM-dd') : null;

    const data = {
      nombre: this.employeeForm.get('nombre')?.value,
      tipoIdentificacion: this.employeeForm.get('tipoIdentificacion')?.value,
      apellidoPaterno: this.employeeForm.get('apellidoPaterno')?.value,
      cedula: this.employeeForm.get('cedula')?.value,
      usuario: this.employeeForm.get('usuario')?.value,
      estado: this.employeeForm.get('estado')?.value,
      apellidoMaterno: this.employeeForm.get('apellidoMaterno')?.value,
      callePrincipal: this.employeeForm.get('callePrincipal')?.value,
      celular: this.employeeForm.get('celular')?.value,
      correoInstitucional: this.employeeForm.get('correoInstitucional')?.value,
      correoPersonal: this.employeeForm.get('correoPersonal')?.value,
      estadoCivil: this.employeeForm.get('estadoCivil')?.value,
      fechaIngreso: formattedFIngreso,
      fechaNacimiento: formattedFNacimiento,
      fechaSalida: formattedFSalida,
      gradoAcademico: this.employeeForm.get('gradoAcademico')?.value,
      nacionalidad: this.employeeForm.get('nacionalidad')?.value,
      salario: this.employeeForm.get('salario')?.value,
      sexo: this.employeeForm.get('sexo')?.value,
      telefono: this.employeeForm.get('telefono')?.value,
      titulo: this.employeeForm.get('titulo')?.value
    };
    console.log('entrando a updateForm', data);

    if (this.data != null) {
      //update registry
      this.employeeService.updateEmployee(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      //create new registry
      this.employeeService.saveEmployee(data).subscribe(
        (data: any) => {
          console.log(data);
          this.dialogRef.close(1);
        },
        (error: any) => {
          console.error(error);
          this.dialogRef.close(2);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.employeeForm.patchValue(data);
  }
}
