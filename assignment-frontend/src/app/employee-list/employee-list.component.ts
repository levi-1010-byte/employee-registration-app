import { Component } from '@angular/core';


import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
export interface Employee {
  id?:number;
  name: string;
  department: string;
  email: string;
  position: string;
  start_date: string;
}
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  

})


export class EmployeeListComponent {
  isGuest: boolean = false;
  employees: Employee[] = []; 
  
 
  constructor( private employeeService: EmployeeService) {}

  
  ngOnInit() {
    this.fetchEmployees();
  }

 
  fetchEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  deleteEmployeefunction(employees: Employee) {
    
    const id = employees.id;
    if (id === undefined) {
      
      console.error('Invalid employee id');
      return;
    }
    const token = localStorage.getItem('jwt_token') || '';
    this.isGuest = !token;
    if (this.isGuest) {
      
      alert("You don't have permission to update employees.");
      return; 
    }
  
    this.employeeService.deleteEmployee(id,token).subscribe(
      () => {
    
        this.employees = this.employees.filter((emp) => emp.id !== id);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting employee:', error);
       
      }
    );
    
  }
 
  



}


