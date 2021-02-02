import { GlobalService } from 'src/app/global.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterUserService } from '../services/register-user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  @ViewChild("firstName", { static: true }) firstName: ElementRef;
  hidePassword = true;
  registerForm: FormGroup;
  constructor(
    private globalService: GlobalService,
    private snackBar: MatSnackBar,
    private registerService: RegisterUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormBuilder().group({
      firstName: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      lastName: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      mobileNo: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(20)])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ])
      ]
    });
    this.globalService.setLayout({
      allowFooter: true,
      pageTitle: "Register Page"
    });
    this.firstName.nativeElement.focus();
  }
  onSubmit({ value, valid }: { value: any; valid: boolean }) {
    if (valid) {
      const arr = [];
      arr.push(value.email, value.password);
      this.registerService.registerUser(arr);
      this.snackBar.open("User Added Successfully", null, { duration: 2000 });
      this.router.navigate(["/login"]);
    } else {
      this.snackBar.open("Please verify your register details.", undefined, {
        duration: 2000
      });
    }
  }
}
