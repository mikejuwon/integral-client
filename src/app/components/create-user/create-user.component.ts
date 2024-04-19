import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  createUserForm: any = FormGroup;

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

  }

  initializeForm() {
    this.createUserForm = this.formBuilder.group({
      firstName: [ null, [ Validators.required ] ],
      lastName: [ null, [ Validators.required ] ],
      email: [ null, [ Validators.required, Validators.email ] ],
      dob: [ null, [ Validators.required ] ],
      gender: [ null, [ Validators.required ] ],
      nationality: [ null, [ Validators.required ] ],
      phone: [ null, [ Validators.required ] ],
      role: [ null ],
    });
  }

  createUser() {
    // check if form is valid
    if (this.createUserForm.invalid) {
      this.toast.error('Please fill all required fields');
      return;
    }
    var formData = this.createUserForm.value;
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
    this.adminService.register(data).subscribe({
      next: (res: any) => {
        this.ngxService.stop();
        this.isSaving = false;
        this.toast.success(res.message);
        this.onEmitStatusChange.emit('created');
        this.closeModal();
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
