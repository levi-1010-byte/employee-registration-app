import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../employee.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  admin: string = '';
  password: string = '';

  constructor(private router: Router, private employeeService: EmployeeService,private cookieService: CookieService) {}

  onSubmit() {
    
    this.employeeService.login(this.admin, this.password).subscribe(
      (result) => {
        
        localStorage.setItem('jwt_token', result.token);
        this.router.navigate(['employees']);
      },
      (_error: any) => {
        alert('Invalid credentials. Please try again.');
      }
    );
  }

  guestLogin() {
    
    this.router.navigate(['employees']);
  }
}
