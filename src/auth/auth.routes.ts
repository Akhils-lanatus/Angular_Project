import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
export const AuthRoutes: Routes = [
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
  },
  {
    title: 'Signup',
    path: 'signup',
    component: SignupComponent,
    // canDeactivate: [(comp: SignupComponent) => comp.hasUnsavedChanges()], //only for learning
  },
];
