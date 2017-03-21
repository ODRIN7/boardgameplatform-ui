import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AppMenuItem, MAIN_MENU} from "./app.menu";
import {AuthService} from "../shared/services/auth/auth.services";

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  public loading: boolean = false;

  views: AppMenuItem[] = MAIN_MENU;

  constructor(public authService: AuthService, public router: Router) {
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): any {
    console.log('app on init');
  }
}
