import {UserPerGame} from "./userPerGame";
import {Status} from "./gameStatus";
export class Game {

  public id: number;
  public chatId: number;
  public title: string;
  public boardGameId: number;
  public userPerGame: UserPerGame[];
  public status: Status;
  public winnerId: string;
  public maxPlayer: number;


  constructor(id: number, chatId: number, title: string, boardGameId: number, userPerGame: UserPerGame[], status: Status, winnerId: string, maxPlayer: number) {
    this.id = id;
    this.chatId = chatId;
    this.title = title;
    this.boardGameId = boardGameId;
    this.userPerGame = userPerGame;
    this.status = status;
    this.winnerId = winnerId;
    this.maxPlayer = maxPlayer;
  }
}
