import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {TdLoadingService} from "@covalent/core";
import {AuthService} from "../shared/services/auth/auth.services";

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string;
  password: string;
  message: string;

  constructor(public router: Router,
              public authService:AuthService) {
  }

  login() {
    console.log('LogMeIn');
    this.authService
      .authenticate(this.username, this.password)
      .catch(errorMessage => this.message = errorMessage)
      .then(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['']);
        }
      });

  }

  ngOnInit(): any {
    console.log('hello `Login` component');
  }

  signUp(): void {
    this.router.navigate(['/signup']);
  }

  goBack(): void {
    window.history.back();
  }
}
