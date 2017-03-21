import {Boardgame} from "./boardgame";
import {Role, UserAuthority, Authority} from "./authority.type";
import {Shopping} from "./shopping";
export class User {

  public username: string;
  public password: string;
  public email: string;
  public icon:string;
  public authorities: Array<Authority>;
  public boardGamesId: number[];
  public shoppings: Array<Shopping>;

  constructor(username: string,
              password: string,
              email: string,
              icon:string,
              authorities: Array<Authority>,
              boardGamesId: number[],
              shoppings: Array<Shopping>) {

    this.username = username;
    this.password = password;
    this.email = email;
    this.authorities = authorities;
    this.boardGamesId = boardGamesId;
    this.shoppings = shoppings;
    this.icon = icon;
  }

  public static toUser( userData: any): User{
    return new User(
      (userData)['user_name'],
      (userData)['password'],
      (userData)['email'],
      (userData)['icon'],
      (userData)['authorities'],
      (userData)['boardGamesId'],
      (userData)['shoppings']);
  }
}
