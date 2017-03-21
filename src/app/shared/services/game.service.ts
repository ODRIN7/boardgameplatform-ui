import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Game} from "../domain/game";
import {gameURL} from "./URI";
import {AuthService} from "./auth/auth.services";


@Injectable()
export class GameService {


  private options: RequestOptions;

  constructor(private http: Http, private authService: AuthService) {
  }

  public getGames(): Observable<Game[]> {
    return this.http.get(gameURL)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getGameById(id: number): Observable<Game> {
    return this.http.get(gameURL + id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getOpenGames(): Observable<Game[]> {
    return this.http.get(gameURL + 'opens')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  public deleteById(id: number): Observable<Game> {
    return this.http.delete(gameURL + id, this.getAuthRequestOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public create(game: Game): Observable<Game> {
    let bodyString = JSON.stringify(game);
    return this.http.post(gameURL, game, this.getAuthRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  public connect(game: Game): Observable<Game> {
    return this.http.post(gameURL + 'connect/' + this.authService.getUserData().username + '/' + game.id, this.getAuthRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public disconnect(game: Game): Observable<Game> {
    return this.http.post(gameURL + 'disconnect/' + this.authService.getUserData().username + '/' + game.id, this.getAuthRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getOpenGamesByUser(): Observable<Game[]> {
    return this.http.get(gameURL + 'user', this.getAuthRequestOptions())
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private  getAuthRequestOptions(): RequestOptions {
    return new RequestOptions({headers: this.authService.getAuthorizationHeaders()});
  }

}
