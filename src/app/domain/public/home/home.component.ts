import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly authService = inject(AuthService);

  login() {
    return this.authService.login();
  }
}
