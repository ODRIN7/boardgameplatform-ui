
import {Message} from "./message";
export class  Chat {

  public id:number;
  public title:String;
  public gameId:number;
  public connectedUser:number[];
  public messages:Message[];

  constructor(id: number, title: String, gameId: number, connectedUser: number[], messages: Message[]) {
    this.id = id;
    this.title = title;
    this.gameId = gameId;
    this.connectedUser = connectedUser;
    this.messages = messages;
  }
}
