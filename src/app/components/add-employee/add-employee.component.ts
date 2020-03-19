import { EmployeeService } from "./../../services/employee.service";
import { GlobalService } from "./../../global.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild("employeeName", { static: true }) employeeName: ElementRef;
  employeeForm: FormGroup;
  private employeeId: number;

  constructor(
    private globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employService: EmployeeService

  ) {

    this.globalService.setLayout({ pageTitle: "Add-Employee", allowFooter: false});
  }

  ngOnInit() {
// debugger;
    this.employeeForm = new FormBuilder().group({
      name: ["", Validators.compose([Validators.required])],
      salary: [0, Validators.compose([Validators.required])],
      age: [0, Validators.compose([Validators.required,Validators.maxLength(100),Validators.minLength(1)])]
    });
    this.activatedRoute.params.subscribe(params => {
      this.employeeId = params.id;
console.log('params',this.employeeId);


      if (this.employeeId != 0 && this.employeeId != undefined) {
        this.globalService.setLayout({ allowFooter: true,pageTitle: "Edit Employee"});
        this.employService.getEmployee(this.employeeId).subscribe((x: any): any => {
console.log('edit',x);
            this.employeeForm.controls["name"].setValue(x.data.employee_name);
            this.employeeForm.controls["salary"].setValue(x.data.employee_salary);
            this.employeeForm.controls["age"].setValue(x.data.employee_age);
          });
      }
    });
    this.employeeName.nativeElement.focus();
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    console.log("empValue", value);
    if (valid) {
      if (!this.employeeId) {
        this.employService .addEmployee(value.name, value.salary, value.age).subscribe(x => {
          console.log('emp',x);
            if (x.status==='success') {
              this.globalService.showMessageSuccess("Employee added successfully." );
              this.router.navigate(["/employee-list"]);
            } else {
              this.globalService.showMessageError(x.message);
            }
          });
      } else {
        this.employService.editEmployee(this.employeeId.toString(),value.name,value.salary,value.age).subscribe((x: any) => {
              if (x.success) {
                this.globalService.showMessageSuccess("Employee edited successfully." );
              } else {
                this.globalService.showMessageError(x.message);
              }
              this.router.navigate(["/employee-list"]);
            },
            err => {
              this.globalService.showMessageError(err.message);
            });
      }
    } else {
      this.globalService.showMessageError("Input(s) are not valid.");
    }
  }
}
