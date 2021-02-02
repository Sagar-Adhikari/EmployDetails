import { GlobalService } from "./../../global.service";
import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.scss"],
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
    this.globalService.setLayout({
      allowFooter: false,
      pageTitle: "Employees Details",
    });
    this.globalService.setLoading(false);
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.loading = true;
    const empId = this.activatedRoute.snapshot.paramMap.get("id");
    if (empId!= null && empId != undefined) {
      this.employeeService.getEmployee(empId.toString()).subscribe(
        (x: any) => {
          if (x.status === "success") {
            this.employData = x.data;
            this.loading = false;
            this.globalService.showMessageSuccess(x.message);
          } else {
            this.loading = false;
            this.globalService.showMessageError(
              "Unable to fetch data from server!"
            );
          }
        },
        (error) => {
          this.loading = false;
          this.globalService.showMessageError(error.message);
        }
      );
    }
  }

  deleteEmployee() {
    this.loading = true;
    const empId = this.activatedRoute.snapshot.paramMap.get("id");
    this.employeeService.deleteEmployee(empId.toString()).subscribe(
      (x: any) => {
        console.log("delete", x);
        if (x.status === "success") {
          this.loading = false;
          this.globalService.showMessageSuccess(x.message);
          this.router.navigate(["/employee-list"]);
        } else {
          this.loading = false;
          this.globalService.showMessageError(
            "Unable to delete the emplooye , Server Error!"
          );
        }
      },
      (error) => {
        this.loading = false;
        this.globalService.showMessageError(error.message);
      }
    );
  }
}
