import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Shopping} from "../domain/shopping";
import {shoppingsUrl} from "./URI";
import {AuthService} from "./auth/auth.services";


@Injectable()
export class StoreService {

  private options: RequestOptions;

  constructor(public http: Http, private authService: AuthService) {
  }

  public getShoppings(): Observable<Shopping[]> {
    return this.http.get(shoppingsUrl)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getShoppingsByUser(): Observable<Shopping[]> {
    return this.http.get(shoppingsUrl + 'user', this.getAuthRequestOptions())
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public removeShopping(id: number): Observable<Shopping> {
    let headers = this.authService.getAuthorizationHeaders();
    return this.http.delete(shoppingsUrl + id, this.getAuthRequestOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public addToCard(shopping: Shopping): Observable<Shopping> {
    let bodyString = JSON.stringify(shopping);
    return this.http.post(shoppingsUrl, shopping, this.getAuthRequestOptions())
      .map((res: Response) => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error'));
  }

  public buy(shopping: number[]): Observable<Shopping> {
    return this.http.post(shoppingsUrl + 'buy', shopping, this.getAuthRequestOptions())
      .map((res: Response) => res.json());

  }

  public removeShoppings(id: number[]): Observable<Shopping> {
    return this.http.post(shoppingsUrl + 'delete',id, this.getAuthRequestOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  private  getAuthRequestOptions(): RequestOptions {
    return new RequestOptions({headers: this.authService.getAuthorizationHeaders()});
  }
}

