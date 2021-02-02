import { EmployeeService } from "./../../services/employee.service";
import { GlobalService } from "./../../global.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from 'src/environments/environment.prod';
import { IEmployee } from '../interfaces';

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild("employeeName", { static: true }) employeeName: ElementRef;

  private iconPath = environment.icon_image_path + 'fakepath/';

  employeeForm: FormGroup;

  private employeeId: number;

  selectedFile = null;

  loading = false;

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
    this.employeeForm = new FormBuilder().group({
      name: ['',  Validators.compose([Validators.maxLength(50), Validators.minLength(1), Validators.required])],
      salary: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(1)])],
      file: []

    });
    this.activatedRoute.params.subscribe(params => {
      // debugger;
      this.employeeId = params.id;
      if (this.employeeId != null && this.employeeId != undefined) {
        this.globalService.setLayout({ allowFooter: true, pageTitle: 'Edit Employee' });
        this.employService.getEmployee(this.employeeId.toString()).subscribe((x: any) => {
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
    const empId = this.activatedRoute.snapshot.paramMap.get('id');
    if (valid) {
      if (!empId) {
        // var body = {
        //   name: value.name,
        //   age: value.age,
        //   salary: value.salary
        // }
        this.employService.addEmployee(value.name,value.age,value.salary).subscribe((x : any) => {
          console.log('emp', x);
          if (x.status === 'success') {
            this.loading = false;
            this.globalService.showMessageSuccess("Employee added successfully.");
            this.router.navigate(["/employee-list"]);
          } else {
            this.loading = false;
            this.globalService.showMessageError(x.message);
          }
        });
      } else {
        this.employService.editEmployee(this.employeeId.toString(), value.name, value.salary, value.age).subscribe((x: any) => {
          if (x.success) {
            this.loading = false;
            this.globalService.showMessageSuccess("Employee edited successfully.");
          } else {
            this.loading = false;
            this.globalService.showMessageError(x.message);
          }
          this.router.navigate(["/employee-list"]);
        },
          error => {
            this.globalService.showMessageError(error.message);
          });
      }
    } else {
      this.globalService.showMessageError("Input(s) are not valid!");
    }
  }
}
