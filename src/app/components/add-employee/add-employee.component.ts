import { EmployeeService } from "./../../services/employee.service";
import { GlobalService } from "./../../global.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild("employeeName", { static: true }) employeeName: ElementRef;
  private iconPath = environment.icon_image_path + 'photo/p/';

  employeeForm: FormGroup;
  private employeeId: number;
  selectedFile = null;

  imgUrl: any = this.iconPath + 'default.jpg';

  constructor(
    private globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employService: EmployeeService

  ) {

    this.globalService.setLayout({ pageTitle: "Add-Employee", allowFooter: false });
  }

  ngOnInit() {
    // debugger;
    // this.employService.getEmployee('4').subscribe(x=>{
    //   console.log('edit by id',x);
    // })
    this.employeeForm = new FormBuilder().group({
      name: ['', Validators.compose([Validators.required])],
      salary: [0, Validators.compose([Validators.required])],
      age: [0, Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(1)])],
      file:[]

    });
    this.activatedRoute.params.subscribe(params => {
      // debugger;
      this.employeeId = params.id;
      if (this.employeeId != 0 && this.employeeId != undefined) {
        this.globalService.setLayout({ allowFooter: true, pageTitle: 'Edit Employee' });
        this.employService.getEmployee(+this.employeeId).subscribe((x: any) => {

          console.log('edit emp:', x);
          this.employeeForm.controls['name'].setValue(x.data.employee_name);
          this.employeeForm.controls['salary'].setValue(x.data.employee_salary);
          this.employeeForm.controls['age'].setValue(x.data.employee_age);
        });
      }
    });
    this.employeeName.nativeElement.focus();
  }

  onFileSelected(event: any) {
    this.globalService.setLoading(false);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.globalService.setLoading(false);
      };
      this.selectedFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.selectedFile = null;
      this.imgUrl = null;
    }
  }


  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    console.log("empValue", value);
    if (valid) {
      if (!this.employeeId) {
        this.employService.addEmployee(value.name, value.salary, value.age).subscribe(x => {
          console.log('emp', x);
          if (x.status === 'success') {
            this.globalService.showMessageSuccess("Employee added successfully.");
            this.router.navigate(["/employee-list"]);
          } else {
            this.globalService.showMessageError(x.message);
          }
        });
      } else {
        this.employService.editEmployee(this.employeeId.toString(), value.name, value.salary, value.age).subscribe((x: any) => {
          if (x.success) {
            this.globalService.showMessageSuccess("Employee edited successfully.");
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
