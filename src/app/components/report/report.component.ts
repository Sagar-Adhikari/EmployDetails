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
  chartTypeList = [
    { id: 1, name: 'Bar Chart' },
    { id: 2, name: 'Line Chart' },
    { id: 3, name: 'Pie Chart' },
    { id: 4, name: 'Doughnut Chart' },
    { id: 5, name: 'Polar Area Chart' },
 
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
    this.reportTypeChanged(this.flag)
    this.reportService.getEmployeeList().subscribe((x: any) => {
      console.log('employee details', x);
    })
  }

  reportTypeChanged(flag) {
    this.globalService.setLoading(true);
    this.flag = flag;
    this.loading = true;
    this.barChartData = [{ data: [], label: 'Chart Type' }];
    const data = [];
    const label = [];
    console.log('flag', flag);
    if (flag === 1) {
      this.reportService.getEmployeeList().subscribe((x: any) => {

        data.push({ data: x.data.employee_salary, label: x.data.employee_name });
        const categoryData = [];
        for (let i = 0; i < x.data.length; i++) {
          label.push(x.data[i].employee_name);
          categoryData.push(x.data[i].employee_salary);
        }
   
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
        
        this.barChartData = [
          { data: categoryData, label: 'Name vs Age' },
        ];
        this.barChartLabels = label;
        this.loading = false;
        this.globalService.setLoading(false);
      });
    }
  }

  chartTypeChanged(chartTypeFlag) {
    if(chartTypeFlag===1){
      this.barChartType='bar';
    }else if(chartTypeFlag===2){
      this.barChartType='line'
    }else if(chartTypeFlag===3){
      this.barChartType='pie'
    }else if(chartTypeFlag===4){
      this.barChartType='doughnut'
    }else if(chartTypeFlag===5){
      this.barChartType='polarArea'
    }

  }

}
