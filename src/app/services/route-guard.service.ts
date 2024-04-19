import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private router: Router,
    private toast: ToastrService,
  ) { }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.toast.error('You are not authorized to access this page');
      this.router.navigate(['']);
      return false;
    }
  }

}
