import { GlobalService } from "./../../global.service";
import { EmployeeService } from "./../../services/employee.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit {
  data: any[] = [];
  displayedColumns: string[] = [
    "id",
    "employee_name",
    "employee_salary",
    "employee_age",
    // "profile_image",
    "action"
  ];

  isMobile: any;

  constructor(
    private employeeService: EmployeeService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.globalService.setLayout({
      allowFooter: false,
      pageTitle: "Employees List"
    });
  }

  ngOnInit() {
    this.loadEmployeesList();
  }

  loadEmployeesList() {
    // debugger;
    this.globalService.setLoading(true);
    this.employeeService.getEmployeeList().subscribe(x => {
      console.log("employees", x);
      // if (x.status==='success') {
      this.data = x.data;
      this.globalService.setLoading(false);
      // }
    });
  }

  addNew() {
    this.router.navigate(["/create"]);
  }
}
