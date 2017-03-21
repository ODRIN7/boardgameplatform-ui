export enum BoardGameType {
  Dice,
  Logic,
  Card,
  Strategic,
  Table,
  Builder
}

export class BoardGameTypeParam {
  public icon: string;
  public boardGameType: BoardGameType;


  constructor(icon: string, boardGameType: BoardGameType) {
    this.icon = icon;
    this.boardGameType = boardGameType;
  }
}
export const BoardGameTypeParams: Array<BoardGameTypeParam> = ([
  new BoardGameTypeParam("account_circle", BoardGameType.Dice),
  new BoardGameTypeParam("inbox", BoardGameType.Logic),
  new BoardGameTypeParam("inbox", BoardGameType.Card),
  new BoardGameTypeParam("inbox", BoardGameType.Strategic),
  new BoardGameTypeParam("inbox", BoardGameType.Table),
  new BoardGameTypeParam("inbox", BoardGameType.Builder)
]);
