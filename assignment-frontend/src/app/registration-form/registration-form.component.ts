import { Component } from '@angular/core';
import { Employee } from '../employee-list/employee-list.component';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  employee: Employee = { name: '', department: '', email: '', position: '', start_date: '' };
  warningMessage: string = '';
  constructor(private employeeService: EmployeeService) {}

  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe(
      (response: Employee) => {
        console.log('Employee added:', response);
        
        this.resetForm();
        this.warningMessage = '';
      },
      (error: HttpErrorResponse) => {
        this.warningMessage="an error occured ,Enter proper Details"
        console.log(this.warningMessage)
    });
  }
  resetForm() {
    this.employee = {
      name: '',
      department: '',
      email: '',
      position: '',
      start_date: ''
    };
  }
}
