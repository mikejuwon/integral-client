import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Chart} from "chart.js";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { UpdateUserComponent } from '../../components/update-user/update-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any = [];
  pagedUsers: any[] = [];
  pageSize = 5;
  currentPage = 1;
  totalItems = 0;

  public chart: any;
  
  isSearching: boolean = false;

  isSaving: boolean = false;
  isEmpty: boolean = false;
  page: number = 1;

  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private modalService: BsModalService,
    private modalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getGenderData();
    this.getAgeGroupData();
  }

  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        this.totalItems = this.users.length;
        this.pageChanged({ page: this.currentPage });
      },
      error: (error: any) => {
        this.toast.error(error.error.message);
      }
    });
  }

  pageChanged(event: any): void {
    const startIndex = (event.page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.totalItems - 1);
    this.pagedUsers = this.users.slice(startIndex, endIndex + 1);
  }

  getGenderData() {
    this.adminService.getGenderData().subscribe({
      next: (res: any) => {
        this.genderChart(res.data);
      },
      error: (error: any) => {
        this.toast.error(error.error.message);
      }
    });
  }

  getAgeGroupData() {
    this.adminService.getAgeGroupData().subscribe({
      next: (res: any) => {
        this.ageGroupChart(res.data);
      },
      error: (error: any) => {
        this.toast.error(error.error.message);
      }
    });
  }

  refresh() {
    this.getUsers();
    this.getGenderData();
    this.getAgeGroupData();
  }

  addNewUser() {
    const initialState: ModalOptions = {
      class: 'modal-md',
      backdrop: true,
      animated: true,
    };
    this.modalRef = this.modalService.show(CreateUserComponent, initialState);
    this.modalRef.content.onEmitStatusChange.subscribe((res: any) => {
      if (res == 'created') {
        this.refresh();
      } else {
        this.modalRef.hide();
      }
    });
  }

  editUser(user: any) {
    const initialState: ModalOptions = {
      class: 'modal-md',
      backdrop: true,
      animated: true,
      initialState: {
        user: user
      }
    };
    this.modalRef = this.modalService.show(UpdateUserComponent, initialState);
    this.modalRef.content.onEmitStatusChange.subscribe((res: any) => {
      if (res == true) {
        this.refresh();
      } else {
        this.modalRef.hide();
      }
    });
  }

  deleteUser(user: any) {
    const initialState: ModalOptions = {
      class: 'modal-sm',
      backdrop: true,
      animated: true,
      initialState: {
        id: user._id,
        title: 'Delete User',
        message: 'Are you sure you want to remove this user?',
        btnOkText: 'Proceed',
        btnCancelText: 'Cancel',
        action: 'delete-user'
      }
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, initialState);
    this.modalRef.content.onEmitStatusChange.subscribe((action: any) => {
      if (action == 'delete-user') {
        this.handleDelete(user._id);
      }
    });
  }

  handleDelete(id: any) {
    this.adminService.deleteUser(id).subscribe({
      next: (res: any) => {
        this.toast.success(res.message);
        this.refresh();
      },
      error: (error: any) => {
        this.toast.error(error.error.message);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.toast.success('You have been logged out');
  }

  genderChart(data: any) {
    this.chart = new Chart("genderChart", {
      type: 'pie', // This denotes the type of chart
      data: {
        labels: ['Male', 'Female', 'Others'],
        datasets: [{
          data: [data.male, data.female, data.others], // Use the counts from the response object
          backgroundColor: ["#312602", "#5B4701", "#A47F02"], // Add background colors for each category
          hoverOffset: 4 // Add hover offset for better visualization
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Registered Users Demography',
            fullSize: true,
            position: 'top'
          },
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              color: "red"
            }
          }
        },
        aspectRatio: 1
      }
    });
  }


  ageGroupChart(data: any) {
    const labels = data.map((item: { ageRange: any; }) => item.ageRange + ' years');
    const titles = data.map((item: { title: any; }) => item.title );
    const counts = data.map((item: { count: any; }) => item.count);
  
    this.chart = new Chart("ageGroupChart", {
      type: 'bar', // This denotes the type of chart
      data: {
        labels: labels,
        datasets: [{
          label: 'Age Distribution',
          data: counts,
          backgroundColor: ['#312602', '#5B4701', '#A47F02', '#171201', '#896AA0'], // Background colors for each bar
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Age Distribution Chart',
            fullSize: true,
            position: 'top'
          },
          legend: {
            display: false // Hide legend for better visualization
          }
        },
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true // Start y-axis at 0
          }
        }
      }
    });
  }
  

}
