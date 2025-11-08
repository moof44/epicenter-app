import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private router = inject(Router);

  login() {
    // Here you would add your actual authentication logic
    // For this demo, we'll just navigate to the dashboard
    this.router.navigate(['/dashboard']);
  }
}
