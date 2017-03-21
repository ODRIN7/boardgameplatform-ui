import {Component} from "@angular/core";
import {AuthService} from "../shared/services/auth/auth.services";

@Component({
  selector: 'bga-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {


  constructor(public authService:AuthService) {
  }
}
