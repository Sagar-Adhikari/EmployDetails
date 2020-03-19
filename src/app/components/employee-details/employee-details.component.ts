import { GlobalService } from "./../../global.service";
import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.scss"]
})
export class EmployeeDetailsComponent implements OnInit {
  private employeeId: number;
  employData: any;
  image=[`../assets/employeeDetails.png`];

  constructor(
    private globalService: GlobalService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.globalService.setLayout({ pageTitle: "employees Details", allowFooter: false
    });
  }

  ngOnInit() {
    this.employeeId = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.employeeId != 0 && this.employeeId != undefined) {
      this.globalService.setLayout({ pageTitle: 'Employee Details', allowFooter: true })
      this.employeeService.getEmployee(this.employeeId).subscribe(x => {
        console.log("details", x);

      });
    }

    this.deleteEmployee();
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employeeId).subscribe((x: any) => {
      console.log("delete", x);
      this.employData = x.data;
    });
  }
}
