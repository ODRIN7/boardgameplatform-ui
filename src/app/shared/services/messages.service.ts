import {Injectable} from "@angular/core";
import {Message} from "../domain/message";
import {Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {chatUrl} from "./URI";
import {AuthService} from "./auth/auth.services";

@Injectable()
export class MessagesService {

  private options: RequestOptions;

  constructor(public http: Http,
              public authService: AuthService) {
  }

  public getMessagesByChat(chatId: number): Observable<Message[]> {

    let headers = this.authService.getAuthorizationHeaders();
    let options = new RequestOptions({headers: headers});

    return this.http.get(chatUrl + chatId, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractData(res: Response) {
    var data = res.json().data || [];
    data.forEach((d) => {
      d.timestamp = new Date(d.timestamp);
    });
    return data;
  }

  public write(chatId: number, message: Message): Observable<Message> {
    let bodyString = JSON.stringify(message);
    let headers = this.authService.getAuthorizationHeaders();
    let options = new RequestOptions({headers: headers});

    return this.http.post(chatUrl + 'write/' + chatId + '/', message, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


}
