import {Status} from "./Status";
export class Shopping {

  public id: number;
  public boardGameId: number;
  public userId: String;
  public creationTime: Date;
  public status: Status;
  public shoppingPrice: number;


  constructor(id: number, boardGameId: number, userId: String, creationTime: Date, status: Status, shoppingPrice: number) {
    this.id = id;
    this.boardGameId = boardGameId;
    this.userId = userId;
    this.creationTime = creationTime;
    this.status = status;
    this.shoppingPrice = shoppingPrice;
  }
}
