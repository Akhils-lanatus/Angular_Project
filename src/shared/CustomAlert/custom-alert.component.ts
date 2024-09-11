import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-response-alert',
  standalone: true,
  template: `
    <div class="container">
      <div class="alert alert-dark alert-dismissible fade show" role="alert">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          (click)="hideAlert()"
        ></button>
        <h4 class="alert-heading">
          {{ alertTitle }}
        </h4>
        <p>
          {{ alertMessage }}
        </p>
      </div>
    </div>
  `,
})
export class CustomResponseAlert {
  @Input() alertTitle: string = 'ALERT_TITLE';
  @Input() alertMessage: string = 'ALERT_MESSAGE';
  @Output() onHideAlertClick: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  hideAlert() {
    this.onHideAlertClick.emit();
  }
}
