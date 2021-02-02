import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/global.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RegisterUserService } from "../services/register-user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @ViewChild("email", { static: true }) email: ElementRef;

  hidePassword = true;

  loginForm: FormGroup;

  currentURL: any = "assets/login.png";

  private userDetail = [];

  isLogin: boolean = false;

  constructor(
    private globalService: GlobalService,
    private registerService: RegisterUserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.loginForm = new FormBuilder().group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]),
      ],
    });
    this.globalService.setLayout({ allowFooter: true, pageTitle: "Login" });
    this.email.nativeElement.focus();
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    const user: any = [];
    user.push(this.registerService.getUser());
    this.userDetail.push(user[0]);
    if (valid) {
      if (
        value.email === this.userDetail[0][0] &&
        value.password === this.userDetail[0][1]
      ) {
        this.isLogin = true;
        this.snackBar.open("User logged in sucessfully", null, {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1);
        this.router.navigate(["/employee-list"]);
      }
    } else {
      this.snackBar.open(
        "Check your Email and Password or register for new User"
      );
      this.router.navigate(["/login"]);
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 1000);
      this.email.nativeElement.focus();
    }
  }
}
