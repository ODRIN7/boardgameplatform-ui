import {ReadParam} from "./read.param";
export class Message {

  public messageId: number;
  public content: string;
  public authorId: string;
  public timestamp: Date;
  public readParams: ReadParam[];


  constructor(messageId: number, content: string, authorId: string, timestamp: Date, readParams: ReadParam[]) {
    this.messageId = messageId;
    this.content = content;
    this.authorId = authorId;
    this.timestamp = timestamp;
    this.readParams = readParams;
  }


}
