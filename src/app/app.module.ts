import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderConfig, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgChartsModule} from "ng2-charts";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorScreenComponent } from './pages/error-screen/error-screen.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  pbColor: '#FFFFFF',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  bgsColor: '#FFFFFF',
  fgsColor: '#FFFFFF',
  fgsType: SPINNER.ballSpinClockwise, // progress bar spinner
  fgsSize: 100,
  overlayColor: 'rgba(40,40,40,0.8)'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingComponent,
    ErrorScreenComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      extendedTimeOut: 400,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: false,
      easeTime: 200,
      closeButton: true,
      easing: 'ease-in',
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgChartsModule
  ],
  providers: [HttpClientModule,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
