import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {User} from "../../domain/user";
import {AppMenuItem} from "../../../main/app.menu";
import {Role, Authority} from "../../domain/authority.type";
import {authUrl, userUrl} from "../URI";
import {EmitterService} from "../emitter.service";
import {TdLoadingService, TdDialogService} from "@covalent/core";
import {MdSnackBar} from "@angular/material";
import {Shopping} from "../../domain/shopping";
import {Status} from "../../domain/Status";
import {Observable} from "rxjs";


@Injectable()
export class AuthService {

  private authenticated: boolean = false;
  private tokenExpirationDate: Date = null;
  private userData: any = null;
  private tokenData: Oauth2TokenData;
  private userListItem = 'USER_COMPONENT'

  constructor(public http: Http,
              private _loadingService: TdLoadingService,
              private _snackBarService: MdSnackBar,
              private _dialogService: TdDialogService) {
    this.tokenData = JSON.parse(localStorage.getItem('tokenData'));
    if (this.tokenData && this.tokenData.access_token) {
      this.authenticated = true;
      this.userData = this.tokenData.access_token;
      this.tokenExpirationDate = new Date(this.userData.exp * 1000);
      if (this.authenticated && this.tokenExpirationDate < new Date()) {
        console.log('Session timeout');
        this.logout();
      }
    }
  }

  public isAuthenticated(): boolean {
    this.checkTokenExpirationDate();
    return this.authenticated;
  }

  public authenticate(username: string, password: string) {

    console.log('Authentication pending...');

    return new Promise<string>((resolve, reject) => {

      if (!username.trim()) {
        reject('Username cannot be blank');
      }
      if (!password.trim()) {
        reject('Password cannot be blank');
      }
      let basicAuthHeader = btoa(`ui-service:ui-service`);

      let grant_type = 'password';

      let headers = new Headers();
      headers.append('Authorization', `Basic  ${basicAuthHeader}`);
      headers.append('Accept', `application/json`);
      headers.append('Content-Type', `application/x-www-form-urlencoded`);

      let payload = 'username=' + encodeURIComponent(username) + '&password='
        + encodeURIComponent(password) + '&grant_type=' + grant_type;

      this.http
        .post(authUrl, payload, {headers: headers})
        .subscribe(
          data => {
            this.tokenData = data.json();
            this.authenticated = true;
            this.userData = AuthService.decodeAccessToken(this.tokenData.access_token);
            this.tokenExpirationDate = new Date(this.userData.exp * 1000);
            resolve('OK');
            localStorage.setItem('tokenData', JSON.stringify(this.tokenData));
          },
          err => {
            console.log(err);
            reject('Username and password doesn\'t match');
          }
        );
    });
  }

  public registration(username: string, password: string, email: string, icon: string, authorities: Authority[],): void {

    let user: User = new User(username, password, email, icon, authorities, [0], [new Shopping(0, 0, "", null, Status.NOT_PAYED, 0)]);
    this.create(user).subscribe(
      (user) => {
        EmitterService.get(this.userListItem).emit(user);
        this._loadingService.resolve('users.list');
        this._snackBarService.open('Succesful Registration', 'Ok');
      }, (error: Error) => {
        console.log(error.message);
        this._dialogService.openAlert({message: 'There was an error'});
        this._loadingService.resolve('users.list');
      });

  }

  refreshToken() {
    if (this.isAuthenticated() && !this.getUserData().username) {

      let basicAuthHeader = btoa(`ui-service:ui-service`);

      let headers = new Headers();
      headers.append('Authorization', `Basic  ${basicAuthHeader}`);
      headers.append('Accept', `application/json`);
      headers.append('Content-Type', `application/x-www-form-urlencoded`);

      let grant_type = 'refresh_token';

      let data = 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(this.tokenData.refresh_token);

      this.http
        .post(authUrl, data, {headers: headers})
        .subscribe(
          data => {
            this.tokenData = data.json();
            this.authenticated = true;
            this.userData = AuthService.decodeAccessToken(this.tokenData.access_token);
            this.tokenExpirationDate = new Date(this.userData.exp * 1000);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  public  logout(): any {
    this.tokenData = new Oauth2TokenData();
    this.userData = null;
    this.authenticated = false;
    this.tokenExpirationDate = null;
  }

  public  getUserData(): User {
    return User.toUser(this.userData);
  }

  public  getTokenExpirationDate(): Date {
    return this.tokenExpirationDate;
  }

  public  hasRole(role: Role): boolean {
    if (this.isAuthenticated()) {
      return this.getUserData().authorities.indexOf(new Authority(Role.ADMIN_ROLE)) >= 0;
    }
    return false;
  }

  public  hasAnyRole(roles: Role[]): boolean {
    let ok = false;
    roles.forEach(role => {
      if (this.hasRole(role)) {
        ok = true;
      }
    });
    return ok;
  }

  public  getAuthorizationHeaders(): Headers {
    let authorizationHeaders = new Headers();
    if (this.authenticated) {
      authorizationHeaders.append('Authorization', `Bearer ${this.tokenData.access_token}`);
      authorizationHeaders.append('Content-Type', `application/json`);
    }
    return authorizationHeaders;
  }

  private  checkTokenExpirationDate() {
    if (this.authenticated && this.tokenExpirationDate < new Date()) {
      console.log('Session timeout');
      this.logout();
    }
  }

  public  canView(view: AppMenuItem): boolean {
    let ok = false;
    if (!view.roles) {
      ok = true;
    } else {
      // ok = this.hasAnyRole(view.roles);
      return true;
    }
    return ok;
  }

  public static
  decodeAccessToken(access_token: string) {
    return JSON.parse(window.atob(access_token.split('.')[1]));
  }

  public create(user: User): Observable<User> {
    let bodyString = JSON.stringify(user);
    return this.http.post(userUrl, user, this.getAuthRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error'));
  }

  private  getAuthRequestOptions(): RequestOptions {
    return new RequestOptions({headers: this.getAuthorizationHeaders()});
  }

}

class Oauth2TokenData {
  access_token: string = null;
  token_type: string = null;
  expires_in: number = null;
  scope: string = null;
  jti: string = null;
  refresh_token: string = null;

  constructor() {
  }
}
