import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})

export class ConfirmDialogComponent implements OnInit {
  @Input() title = 'Confirmation';
  @Input() message = 'Are you sure you want to perform this action?';
  @Input() btnOkText = 'Yes';
  @Input() btnCancelText = 'No';
  @Input() showCancel = true;
  @Input() action = ''

  onEmitStatusChange = new EventEmitter();

  constructor(
    private modalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.onEmitStatusChange.emit(this.action);
    this.modalRef.hide();
  }

  decline() {
    console.log('cancel');
    this.modalRef.hide();
  }

}

