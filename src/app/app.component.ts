import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header/header.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer/footer.component';
import { AuthService } from '../service/AuthService/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DashboardComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.checkIsLoggedIn();
  }
}
