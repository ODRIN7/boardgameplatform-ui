import {ChangeDetectionStrategy, ElementRef, Component, OnInit, Input} from "@angular/core";
import {Message} from "../../../../shared/domain/message";
import {User} from "../../../../shared/domain/user";
import {MessagesService} from "../../../../shared/services/messages.service";
import {EmitterService} from "../../../../shared/services/emitter.service";
import {TdDialogService} from "@covalent/core";
import {Game} from "../../../../shared/domain/game";
import {Chat} from "../../../../shared/domain/chat";
import {ReadParam} from "../../../../shared/domain/read.param";


@Component({
  selector: 'chat-window',
  templateUrl: './chat.window.html',
  styleUrls: ['./chat.window.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChatWindow implements OnInit {
  @Input() messages: Message[];
  @Input() game: Game;
  @Input() chat: Chat;
  private draftMessage: Message;
  private currentUser: User;
  private messageListId = 'CHAT_COMPONENT'

  constructor(public messagesService: MessagesService,
              private dialogService: TdDialogService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
    this.resetDraftMesssage();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    if (this.draftMessage.content.length > 0) {

      this.messagesService.write(this.game.chatId, this.draftMessage).subscribe(
        () => {
          EmitterService.get(this.messageListId).emit(this.chat);
        }, (error: Error) => {
          this.dialogService.openAlert({message: 'There was an error'});
        });
    }
    this.resetDraftMesssage();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  private resetDraftMesssage(): void {
    this.draftMessage = new Message(10, "", "Dani:", null, [new ReadParam("", false)]);
  }

}
