import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Ensure this path is correct
import { MyAccountComponent } from './app/my-account/my-account.component';

bootstrapApplication(MyAccountComponent, {
  providers: [
    provideRouter(routes) // Configure routing
  ],
})
.catch((err) => console.error(err));
