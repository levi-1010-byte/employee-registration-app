import { Component, Input} from '@angular/core';
import './employee-card.component.css';
import { EmployeeService } from '../employee.service';
export interface Employee {
  name: string;
  department: string;
  email:string;
  position:string;
  start_date:string;
  
}
@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  isGuest: boolean = false;
  @Input()
  employees!: Employee;
  isEditMode: boolean = false;
  editedEmployee: Employee= { name: '',
  department: '',
  email: '',
  position: '',
  start_date: ''}; 

  constructor(private employeeService: EmployeeService) {}

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      
      this.editedEmployee = { ...this.employees };
      
    }
  }

  updateEmployee() {
   
    const token = localStorage.getItem('jwt_token') || '';
    this.isGuest = !token; 
    if (this.isGuest) {
      
      alert("You don't have permission to update employees.");
      return; 
    }
    
    
    
    this.employeeService.updateEmployee(this.editedEmployee,token).subscribe(
      
      (updatedEmployee: Employee) => {
        this.employees = updatedEmployee;
        this.isEditMode = false; 
        this.showDetails = !this.showDetails;
      },
      (error) => {
        console.error('Error updating employee:', error);
       
      }
    );
  }

  showDetails: boolean = false;
  
  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  
  toggleDetails() {
    this.showDetails = !this.showDetails;
}


}
