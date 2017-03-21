import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {BoardGame} from "../domain/boardgamee";
import {boardGameURL} from "./URI";
import {AuthService} from "./auth/auth.services";


@Injectable()
export class BoardGameService {


  private options: RequestOptions;

  constructor(public http: Http, private authService: AuthService) {
  }

  public getBoardGames(): Observable<BoardGame[]> {
    return this.http.get(boardGameURL)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getBoardGamesByType(boardGameType: string): Observable<BoardGame[]> {
    return this.http.get(boardGameURL + "types/" + boardGameType)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getBoardGameById(id: number): Observable<BoardGame> {
    return this.http.get(boardGameURL + id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getBoardGameByIds(ids: number[]): Observable<BoardGame[]> {
    let bodyString = JSON.stringify(ids);
    return this.http.post(boardGameURL + 'boardGames', ids)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  public create(boardGame: BoardGame): Observable<BoardGame> {
    let bodyString = JSON.stringify(boardGame);
    return this.http.post(boardGameURL, boardGame, this.authService.getAuthorizationHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public edit(boardGame: BoardGame): Observable<BoardGame> {
    let bodyString = JSON.stringify(boardGame);
    return this.http.put(boardGameURL + boardGame.id, boardGame, this.authService.getAuthorizationHeaders())
      .map((res: Response) => res.json());

  }

  public deleteById(id: number): Observable<BoardGame> {
    return this.http.delete(boardGameURL + id, this.authService.getAuthorizationHeaders())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getBoardGamesByUser(): Observable<BoardGame[]> {
    return this.http.get(boardGameURL + 'user', this.getAuthRequestOptions())
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteByUser(id: number): Observable<BoardGame> {
    return this.http.delete(boardGameURL + 'user/' + id, this.getAuthRequestOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private  getAuthRequestOptions(): RequestOptions {
    return new RequestOptions({headers: this.authService.getAuthorizationHeaders()});
  }
}
