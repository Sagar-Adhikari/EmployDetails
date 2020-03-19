import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path:'', component: EmployeeListComponent },

  { path: "create", component: AddEmployeeComponent },
  { path: "employee-list", component: EmployeeListComponent },
  { path: "get-employee/:id", component: AddEmployeeComponent },
  { path: "get-employee-details/:id", component: EmployeeDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
