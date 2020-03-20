import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { GlobalService } from 'src/app/global.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  chartList = [
    { id: 1, name: 'Name Vs Salary Chart' },
    { id: 2, name: 'Name Vs Age Chart' },
   
  ];


  chartId: number = 1;
  flag: number = 1;

  loading = false;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;


  public barChartData: any[] = [
    { data: [], label: '' },

  ];

  constructor(
    private reportService: ReportService,
    private globalService: GlobalService
  ) {
    this.globalService.setLayout({ pageTitle: 'Employees Report ', allowFooter: false });

  }

  ngOnInit() {
    this.reportService.getEmployeeList().subscribe((x: any) => {
      console.log('employee details', x);
    })
  }

  chartTypeChanged(flag) {
    this.globalService.setLoading(true);
    this.flag = flag;
    this.loading = true;
    this.barChartData = [{ data: [], label: 'Chart Type' }];
    const data = [];
    const label = [];
    console.log('flag',flag);
    if (flag === 1) {
      this.reportService.getEmployeeList().subscribe((x: any) => {
       
        data.push({ data: x.data.employee_salary, label: x.data.employee_name });
        const categoryData = [];
        for (let i = 0; i < x.data.length; i++) {
          label.push(x.data[i].employee_name);
          categoryData.push(x.data[i].employee_salary);
        }
        // console.log('Category ', x);
        // console.log(this.barChartData,'Barchart')
        this.barChartData = [
          { data: categoryData, label: 'Name vs Salary' },
        ];
        this.barChartLabels = label;
        this.loading = false;
        this.globalService.setLoading(false);
      });
    }
    else if (flag === 2) {
      this.reportService.getEmployeeList().subscribe((x: any) => {
       
        data.push({ data: x.data.employee_age, label: x.data.employee_name });
        const categoryData = [];
        for (let i = 0; i < x.data.length; i++) {
          label.push(x.data[i].employee_name);
          categoryData.push(x.data[i].employee_age);
        }
        // console.log('Category ', x);
        // console.log(this.barChartData,'Barchart')
        this.barChartData = [
          { data: categoryData, label: 'name vs age' },
        ];
        this.barChartLabels = label;
        this.loading = false;
        this.globalService.setLoading(false);
      });
    }


  }

}
