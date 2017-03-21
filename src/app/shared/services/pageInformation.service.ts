import {Injectable, EventEmitter} from "@angular/core";
import {Http, RequestOptions, Response} from "@angular/http";
import {User} from "../domain/user";
import {Observable} from "rxjs";
import {Game} from "../domain/game";
import {pageInformationService} from "./URI";


@Injectable()
export class PageInformationService {


  private options: RequestOptions;

  constructor(public http: Http) {
  }

  public getPageInformations(): Observable<Game[]> {
    return this.http.get(pageInformationService)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getPageInformationByID(id: number): Observable<Game> {
    return this.http.get(pageInformationService + id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getRecentPageInformation(): Observable<Game> {
    return this.http.get(pageInformationService+"latest")
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
