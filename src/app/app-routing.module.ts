import { EmployeeDetailsComponent } from "./components/employee-details/employee-details.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportComponent } from "./components/report/report.component";

const routes: Routes = [
  // { path: '', component: EmployeeListComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },

  { path: "add-employ", component: AddEmployeeComponent },
  { path: "employee-list", component: EmployeeListComponent },
  { path: "add-employee/:id", component: AddEmployeeComponent },
  { path: "get-employee-details/:id", component: EmployeeDetailsComponent },
  { path: "chart-report", component: ReportComponent },

  {
    path: "login",
    loadChildren: () =>
      import("../app/modules/auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
