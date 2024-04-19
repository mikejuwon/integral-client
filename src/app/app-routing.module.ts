import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorScreenComponent } from './pages/error-screen/error-screen.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
  },
  { path: '**', component: ErrorScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
