import { GlobalService } from "./../../global.service";
import { EmployeeService } from "./../../services/employee.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatSort, MatSnackBar } from '@angular/material';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  loading = false;

  private sortField: string;

  sortDirection: string;

  private tempData: any;

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
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.globalService.setLayout({allowFooter: false, pageTitle: "Employees List"});
  }

  ngOnInit() {
    this.loadEmployeesList();
  }

  loadEmployeesList() {
    // debugger;
    this.globalService.setLoading(true);
    this.employeeService.getEmployeeList().subscribe(x => {
      console.log("employees", x);
      if (x.status==='success') {
      this.data = x.data;
      this.tempData = [...this.data];
      this.globalService.setLoading(false);
      this.globalService.showMessageSuccess(x.message);
      }else{
      this.globalService.showMessageError('Unable To fetch Data,Server Error!');
        this.globalService.setLoading(false);
      }
    },(error)=>{
      this.snackBar.open(error);
      console.log('error handling:',error);
      this.globalService.showMessageError(error.message);
      this.globalService.setLoading(false);
    });
  }

  addNew() {
    this.router.navigate(["/add-employ"]);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((x: { active: any; direction: string; }) => {
      this.sortField = x.active;
      this.sortDirection = x.direction === 'asc' ? 'ASC' : x.direction === 'desc' ? 'DESC' : undefined;
    })
    merge(this.sort.sortChange).pipe(
      tap(() => this.sortData())
    ).subscribe();
  }


  onEditEmployee(id){
    // this.router.navigate('/employee-list',id)

  }


  sortData() {
    debugger;
    // this.data = [...this.tempData];
    if (this.sortField === 'id') {
      if (this.sortDirection === 'ASC') {
        this.data.sort(function (a: any, b: any) { return a.id - b.id });
      } else if (this.sortDirection === 'DESC') {
        this.data.sort(function (a: any, b: any) { return b.id - a.id });
      }
    }
    if (this.sortField === 'employee_name') {
      if (this.sortDirection === 'ASC') {
        this.data.sort(function (a: any, b: any) {
          var nameA = a.serviceProviderName.toUpperCase();
          var nameB = b.serviceProviderName.toUpperCase();
          if (nameA < nameB) {
            return -1;

          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;

        })
      } else if (this.sortDirection === 'DESC') {
        this.data.sort(function (a: any, b: any) {

          var nameA = a.serviceProviderName.toUpperCase();
          var nameB = b.serviceProviderName.toUpperCase();

          if (nameA > nameB) {
            return -1;

          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;

        })
      }
    }
    if (this.sortField === 'employee_salary') {
      if (this.sortDirection === 'ASC') {
        this.data.sort(function (a: any, b: any) { return a.forwarded - b.forwarded });
      } else if (this.sortDirection === 'DESC') {
        this.data.sort(function (a: any, b: any) { return b.forwarded - a.forwarded });
      }
    }
    if (this.sortField === 'employee_age') {
      if (this.sortDirection === 'ASC') {
        this.data.sort(function (a: any, b: any) { return a.pending - b.pending });
      } else if (this.sortDirection === 'DESC') {
        this.data.sort(function (a: any, b: any) { return b.pending - a.pending });
      }
    }


  }



}
