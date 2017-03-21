export class UserPerGame {

  public id: number;
  public host: boolean;
  public userId: String;
  public score: number;


  constructor(id: number, host: boolean, userId: String, score: number) {
    this.id = id;
    this.host = host;
    this.userId = userId;
    this.score = score;
  }
}
