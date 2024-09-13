import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  template: `
    <div class="d-flex justify-content-center align-items-center">
      <h1>Page Not Found</h1>
      <hr />
      <button class="btn btn-primary btn-lg" [routerLink]="''">Home</button>
    </div>
  `,
  imports: [RouterLink],
})
export class PageNotFoundComponent {}
