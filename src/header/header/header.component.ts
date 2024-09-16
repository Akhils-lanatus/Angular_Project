import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/AuthService/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../Models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  isLoggedIn: boolean = false;
  router: Router = inject(Router);
  private userSub!: Subscription;
  private toastr = inject(ToastrService);
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    });
  }

  onLogout() {
    localStorage.removeItem('authToken');
    this.authService.user.next(null);
    this.toastr.success('Logged out', 'Success');
    this.router.navigate(['auth', 'login']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
