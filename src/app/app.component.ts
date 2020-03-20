import { GlobalService } from './global.service';
import { Component } from "@angular/core";
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "employeeDetail";

  isOpenSideNavBar = true;


  loading = false;

  pageTitle = 'Initial Title';
  allowFooter = true;
  smallScreen = false;


  constructor(
    private globalService:GlobalService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ){

    this.globalService.pageTitle$.subscribe(x => {
      console.log('layout',x);
      this.pageTitle = x.pageTitle;
      this.allowFooter = x.allowFooter;
    });

    this.globalService.loading$.subscribe(x => {
      this.loading = x;
    })

  
  }
}
