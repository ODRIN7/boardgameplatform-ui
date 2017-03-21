export class Boardgame {

  private _id: string;
  private _shortDescription: string;


  constructor(id: string, shortDescription: string) {
    this._id = id;
    this._shortDescription = shortDescription;
  }

  get id(): string {
    return this._id;
  }

  get shortDescription(): string {
    return this._shortDescription;
  }

  set shortDescription(value: string) {
    this._shortDescription = value;
  }
  public static create(id: string, shortDescription: string):Boardgame{
    return new Boardgame(id,shortDescription);
  }
}
