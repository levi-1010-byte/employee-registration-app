import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeCardComponent,
    RegistrationFormComponent,
    LoginComponent,
    NavbarComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    
    FormsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
