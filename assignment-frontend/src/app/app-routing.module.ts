import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ { path: '', component:LoginComponent },
{ path: 'employees', component: EmployeeListComponent },
{ path: 'registration', component: RegistrationFormComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
