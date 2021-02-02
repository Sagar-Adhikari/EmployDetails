import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

import {
  MatFormFieldModule, MatInputModule, MatToolbarModule, MatSidenavModule, MatNativeDateModule,
  MatDatepickerModule, MatSelectModule, MatButtonModule, MatProgressBarModule,
  MatSliderModule, MatSnackBarModule, MatTableModule, MatSortModule, MatPaginatorModule,
  MatIconModule, MatListModule, MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent,RegisterUserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
     MatPaginatorModule,
     MatSelectModule,
     ChartsModule,
    //  ChartsModule,
     MatProgressBarModule,
  ],
})
export class AuthModule { }
