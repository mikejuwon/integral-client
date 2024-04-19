import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})

export class UpdateUserComponent implements OnInit {
  @Input() user: any;
  updateUserForm: any = FormGroup;

  onEmitStatusChange = new EventEmitter();

  isSaving: boolean = false;


  constructor(
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
  ) { 
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.adminService.getUser(this.user._id).subscribe({
      next: (res: any) => {
        this.user = res.user;
        console.log(this.user);
        this.initializeForm();
      },
      error: (error: any) => {
        this.toast.error(error.error.message);
      }
    });
  }

  initializeForm() {
    this.updateUserForm = this.formBuilder.group({
      firstName: [ this.user?.firstName, [ Validators.required ] ],
      lastName: [ this.user?.lastName, [ Validators.required ] ],
      email: [ this.user?.email, [ Validators.required, Validators.email ] ],
      dob: [ this.user?.dob, [ Validators.required ] ],
      gender: [ this.user?.gender, [ Validators.required ] ],
      nationality: [ this.user?.nationality, [ Validators.required ] ],
      phone: [ this.user?.phone, [ Validators.required ] ],
      role: [ this.user?.role ],
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }
  
  updateUser() {
    // check if form is valid
    if (this.updateUserForm.invalid) {
      this.toast.error('Please fill all required fields');
      return;
    }
    var formData = this.updateUserForm.value;
    var data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      nationality: formData.nationality,
      phone: formData.phone,
      role: formData.role,
    }

    this.ngxService.start();
    this.isSaving = true;

    this.adminService.updateUser(this.user._id, data).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.isSaving = false;
        this.toast.success(res.message);
        this.onEmitStatusChange.emit(true);
        this.modalRef.hide();
      },
      error: (error: any) => {
        this.ngxService.stop();
        this.isSaving = false;
        this.toast.error(error.error.message);
      }
    });

  }

  closeModal() {
    this.modalRef.hide();
  }


}
