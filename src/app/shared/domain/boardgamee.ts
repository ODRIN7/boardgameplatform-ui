export class BoardGame {

  public id: number;
  public name: String;
  public icon: String;
  public shortDescription: String;
  public rules: string[];
  public typeOfBoardGames: string[];
  public pdfDescription: string;
  public price: number;
  public maxplayer: number;
  public minplayer: number;

  constructor(id: number,
              name: String,
              icon: String,
              shortDescription: String,
              rules: string[],
              typeOfBoardGames: string[],
              pdfDescription: string,
              price: number,
              maxplayer: number,
              minplayer: number) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.shortDescription = shortDescription;
    this.rules = rules;
    this.typeOfBoardGames = typeOfBoardGames;
    this.pdfDescription = pdfDescription;
    this.price = price;
    this.maxplayer = maxplayer;
    this.minplayer = minplayer;
  }
}
