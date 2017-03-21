import {Injectable, EventEmitter} from "@angular/core";
import {Http, RequestOptions, Response} from "@angular/http";
import {User} from "../domain/user";
import {Observable} from "rxjs";
import {Game} from "../domain/game";
import {notificationUrl} from "./URI";


@Injectable()
export class NotificationService {

  private options: RequestOptions;

  constructor(public http: Http) {
  }

  public getNotifications(): Observable<Game[]> {
    return this.http.get(notificationUrl)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getNotificationByID(id: number): Observable<Game> {
    return this.http.get(notificationUrl + id)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteById(id: number): Observable<Game> {
    return this.http.delete(notificationUrl + id)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
