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
      this.pageTitle = x.pageTitle;
      this.allowFooter = x.allowFooter;
    });

    // this.breakpointObserver.observe([
    //   '(max-width: 768px)'
    // ]).subscribe(result => {
    //   if (result.matches) {
    //     this.smallScreen = true;
    //   } else {
    //     this.smallScreen = false;
    //   }
    // });

  }
}
