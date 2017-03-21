import {Injectable, EventEmitter} from "@angular/core";
import {Http, RequestOptions, Response} from "@angular/http";
import {User} from "../domain/user";
import {Observable} from "rxjs";
import {Game} from "../domain/game";
import {statiticsUrl} from "./URI";


@Injectable()
export class StatisticsService {


  private options: RequestOptions;

  constructor(public http: Http) {
  }

  public getStatistics(): Observable<Game[]> {
    return this.http.get(statiticsUrl)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getStatisticsById(id: number): Observable<Game> {
    return this.http.get(statiticsUrl + id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteById(id: number): Observable<Game> {
    return this.http.delete(statiticsUrl + id)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
