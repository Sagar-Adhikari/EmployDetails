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
  private employeeId: string;
  employData: any;
  image = [`../assets/employeeDetails.png`];

  loading = false;

  constructor(
    private globalService: GlobalService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.globalService.setLayout({ allowFooter: false, pageTitle: "Employees Details" });
    this.globalService.setLoading(false);
  }

  ngOnInit() {
    this.employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getEmployee();

  }
  getEmployee() {
    debugger;
    this.loading = true;
    if (this.employeeId != null && this.employeeId != undefined) {
      this.employeeService.getEmployee(this.employeeId).subscribe(x => {
        this.employData = x.data;
        console.log("details", x);

      });
    }
  }

  deleteEmployee() {

    this.loading = true;
    this.employeeService.deleteEmployee(this.employeeId.toString()).subscribe((x: any) => {
      console.log("delete", x);
      if (x.status === 'success') {
        this.router.navigate(['/employee-list']);
      } else {
        this.globalService.showMessageError(x.message);
      }
    });
  }
}
