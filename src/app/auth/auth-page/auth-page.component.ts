import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserLoginReq, UserRegReq } from '../../models';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Observable, of, map } from 'rxjs';
import { HttpService } from '../../http.service';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth-utils/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  private readonly authService = inject(AuthService);
  userResponse = this.authService.getUser$();
  public userLoginData: UserLoginReq = { login: '', password: '' };
  public userRegData: UserRegReq = { login: '', name: '', password: '' };

  public loginStatus: 'login' | 'registration' = 'login';
  constructor(private router: Router) {
    this.userResponse.subscribe((v) =>
      v ? router.navigateByUrl('/booked') : console.log('auth again')
    );
  }
  public tryAuth() {
    if (this.loginStatus === 'login') {
      this.authService.login(this.userLoginData);
    } else {
      this.authService.register(this.userRegData);
    }
  }
}
