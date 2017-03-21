import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Message} from "../../../../shared/domain/message";
import {User} from "../../../../shared/domain/user";
import {AuthService} from "../../../../shared/services/auth/auth.services";

@Component({
  inputs: ['message'],
  selector: 'chat-message',
  templateUrl: './chat.message.html',
  styleUrls: ['./chat.message.scss'],
})
export class ChatMessage implements OnInit {

  message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public  authService:AuthService) {
  }

  ngOnInit(): void {
    if (this.message && this.message.authorId != this.authService.getUserData().username ) {
      this.incoming = false;
    }
  }
}
