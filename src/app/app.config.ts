import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalConfig, provideToastr } from 'ngx-toastr';
import { AuthHttpInterceptor } from '../service/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      maxOpened: 2,
      autoDismiss: true,
      preventDuplicates: true,
      countDuplicates: true,
      includeTitleDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      easeTime: 300,
      closeButton: true,
    }), // Toastr providers
  ],
};
