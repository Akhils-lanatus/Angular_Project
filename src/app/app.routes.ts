import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from '../auth/pagenotfound.component';
import { authGuard, publicAuth } from '../guards/auth.guard';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
  },
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    title: 'Auth',
    path: 'auth',
    loadChildren: () => import('../auth/auth.routes').then((m) => m.AuthRoutes),
    canActivate: [publicAuth],
  },
  {
    title: 'Page not found',
    path: '**',
    component: PageNotFoundComponent,
  },
];
