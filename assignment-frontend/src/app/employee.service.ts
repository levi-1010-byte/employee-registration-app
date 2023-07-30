import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from './employee-list/employee-list.component'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees'; 

  constructor(private http: HttpClient) { }

  // Fetch all employees from the backend
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  
  login(admin: string, password: string): Observable<any> {
    const loginData = {
      admin,
      password
    };
    return this.http.post<any>('http://localhost:3000/api/login', loginData);
  }

 
  // Add a new employee to the backend
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // Update an existing employee in the backend
  updateEmployee(employee: Employee,token:string): Observable<Employee> {
    const employeeWithoutId: Employee = { ...employee };
    delete employeeWithoutId.id;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employeeWithoutId,{
      headers,
      withCredentials: true,});
  }

  // Delete an employee from the backend
  deleteEmployee(id: number,token:string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`,{
      headers,
      withCredentials: true,});
  }
}
