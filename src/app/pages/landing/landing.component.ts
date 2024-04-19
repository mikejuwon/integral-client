import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  loginForm: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.required,          
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ]
    });
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      username: formData.username,
      password: formData.password
    }

    this.ngxService.stop();

    this.adminService.login(data).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.toast.success(res.message);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.ngxService.stop();
        this.toast.error(error.error.message);
      }
    })
  }

}
