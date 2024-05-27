import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  
  private employeeService = inject(EmployeeService);
  private dialogRef = inject(MatDialogRef);
  public data= inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
  }
  
  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if(this.data != null){
      this.employeeService.deleteEmployee(this.data.id).
      subscribe((data:any) =>{
        this.dialogRef.close(1);
      }, (error:any) =>{
        this.dialogRef.close(2);
      })
    }else {
      this.dialogRef.close(2);
    }
  }
}
