import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {BoardGame} from "../domain/boardgamee";
import {boardGameURL, userUrl} from "./URI";
import {AuthService} from "./auth/auth.services";
import {User} from "../domain/user";


@Injectable()
export class UsersService {

  constructor(public http: Http, private authService: AuthService) {
  }


  public getUsers(): Observable<User[]> {
    return this.http.get(userUrl, this.getAuthRequestOptions())
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getUsersByAuthority(authority: string): Observable<User[]> {
    return this.http.get(userUrl + "authority/" + authority, this.getAuthRequestOptions())
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get(userUrl + username, this.getAuthRequestOptions())
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteByUsername(username: string): Observable<User> {
    return this.http.delete(userUrl + username, this.getAuthRequestOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public create(user: User): Observable<User> {
    let bodyString = JSON.stringify(user);
    return this.http.post(userUrl, user, this.getAuthRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error'));
  }

  public edit(user: User): Observable<User> {
    let bodyString = JSON.stringify(user);
    return this.http.put(userUrl + user.username, user, this.getAuthRequestOptions())
      .map((res: Response) => res.json());

  }
  private  getAuthRequestOptions(): RequestOptions {
    return new RequestOptions({headers: this.authService.getAuthorizationHeaders()});
  }
}
