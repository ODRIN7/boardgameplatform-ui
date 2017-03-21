import {Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges} from "@angular/core";
import {MessagesService} from "../../../shared/services/messages.service";
import {Chat} from "../../../shared/domain/chat";
import {EmitterService} from "../../../shared/services/emitter.service";
import {TdLoadingService, TdMediaService} from "@covalent/core";
import {Message} from "../../../shared/domain/message";
import {Game} from "../../../shared/domain/game";

@Component({
  selector: 'bga-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges {

  @Input() game: Game;
  @Input() title: String;
  public chat: Chat;
  public messages: Message[];
  private messageListId = 'CHAT_COMPONENT'

  ngOnChanges(changes: SimpleChanges): void {
    this.chat = new Chat(0, "", 801, [], []);
    this.media.broadcast();

      this.loadChat();
      EmitterService.get(this.messageListId).subscribe(() => {
        this.loadChat()
      });
  }


  constructor(private loadingService: TdLoadingService,
              private messageService: MessagesService,
              public media: TdMediaService) {
  }

  public loadChat(): void {
    if (this.game.chatId > 50) {
      this.loadingService.register('messages.list');
      this.messageService.getMessagesByChat(this.game.chatId).subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.loadingService.resolve('messages.list');
        }, (error: Error) => {
          this.messageService.getMessagesByChat(this.game.chatId).subscribe(
            (messages: Message[]) => {
              this.messages = messages;
              this.loadingService.resolve('messages.list');
            });
        });
    }
  }
}
