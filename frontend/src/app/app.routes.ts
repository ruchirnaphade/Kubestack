import { Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component'; // <-- add this line
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'; // <-- add this line

export const routes: Routes = [
  { path: '', component: EmployeesListComponent, title: 'Employees List' },
  { path: 'new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'edit/:id', component: EditEmployeeComponent }, // <-- add this line
];
