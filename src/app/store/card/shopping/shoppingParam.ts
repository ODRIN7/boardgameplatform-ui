import {BoardGame} from "../../../shared/domain/boardgamee";
import {Status} from "../../../shared/domain/Status";
import {Shopping} from "../../../shared/domain/shopping";
export class ShoppingParam {

  public id: number;
  public boardGame: BoardGame;
  public shopping: Shopping;
  public status: Status;
  public shoppingPrice: number;


  constructor(id: number, boardGame: BoardGame, shopping: Shopping, status: Status, shoppingPrice: number) {
    this.id = id;
    this.boardGame = boardGame;
    this.shopping = shopping;
    this.status = status;
    this.shoppingPrice = shoppingPrice;
  }
}
