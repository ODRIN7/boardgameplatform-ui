"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var models_1 = require('../models');
var ChatMessage = (function () {
    function ChatMessage(userService) {
        this.userService = userService;
    }
    ChatMessage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currentUser
            .subscribe(function (user) {
            _this.currentUser = user;
            if (_this.message.author && user) {
                _this.incoming = _this.message.author.id !== user.id;
            }
        });
    };
    ChatMessage = __decorate([
        core_1.Component({
            inputs: ['message'],
            selector: 'chat-message',
            template: "\n  <div class=\"msg-container\"\n       [ngClass]=\"{'base-sent': !incoming, 'base-receive': incoming}\">\n\n    <div class=\"avatar\"\n         *ngIf=\"!incoming\">\n      <img src=\"{{message.author.avatarSrc}}\">\n    </div>\n\n    <div class=\"messages\"\n      [ngClass]=\"{'msg-sent': !incoming, 'msg-receive': incoming}\">\n      <p>{{message.text}}</p>\n      <p class=\"time\">{{message.sender}} \u2022 {{message.sentAt | fromNow}}</p>\n    </div>\n\n    <div class=\"avatar\"\n         *ngIf=\"incoming\">\n      <img src=\"{{message.author.avatarSrc}}\">\n    </div>\n  </div>\n  "
        })
    ], ChatMessage);
    return ChatMessage;
}());
exports.ChatMessage = ChatMessage;
var ChatWindow = (function () {
    function ChatWindow(messagesService, threadsService, userService, el) {
        this.messagesService = messagesService;
        this.threadsService = threadsService;
        this.userService = userService;
        this.el = el;
    }
    ChatWindow.prototype.ngOnInit = function () {
        var _this = this;
        this.messages = this.threadsService.currentThreadMessages;
        this.draftMessage = new models_1.Message();
        this.threadsService.currentThread.subscribe(function (thread) {
            _this.currentThread = thread;
        });
        this.userService.currentUser
            .subscribe(function (user) {
            _this.currentUser = user;
        });
        this.messages
            .subscribe(function (messages) {
            setTimeout(function () {
                _this.scrollToBottom();
            });
        });
    };
    ChatWindow.prototype.onEnter = function (event) {
        this.sendMessage();
        event.preventDefault();
    };
    ChatWindow.prototype.sendMessage = function () {
        var m = this.draftMessage;
        m.author = this.currentUser;
        m.thread = this.currentThread;
        m.isRead = true;
        this.messagesService.addMessage(m);
        this.draftMessage = new models_1.Message();
    };
    ChatWindow.prototype.scrollToBottom = function () {
        var scrollPane = this.el
            .nativeElement.querySelector('.msg-container-base');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    };
    ChatWindow = __decorate([
        core_1.Component({
            selector: 'chat-window',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"chat-window-container\">\n      <div class=\"chat-window\">\n        <div class=\"panel-container\">\n          <div class=\"panel panel-default\">\n\n            <div class=\"panel-heading top-bar\">\n              <div class=\"panel-title-container\">\n                <h3 class=\"panel-title\">\n                  <span class=\"glyphicon glyphicon-comment\"></span>\n                  Chat - {{currentThread.name}}\n                </h3>\n              </div>\n              <div class=\"panel-buttons-container\">\n                <!-- you could put minimize or close buttons here -->\n              </div>\n            </div>\n\n            <div class=\"panel-body msg-container-base\">\n              <chat-message\n                   *ngFor=\"let message of messages | async\"\n                   [message]=\"message\">\n              </chat-message>\n            </div>\n\n            <div class=\"panel-footer\">\n              <div class=\"input-group\">\n                <input type=\"text\" \n                       class=\"chat-input\"\n                       placeholder=\"Write your message here...\"\n                       (keydown.enter)=\"onEnter($event)\"\n                       [(ngModel)]=\"draftMessage.text\" />\n                <span class=\"input-group-btn\">\n                  <button class=\"btn-chat\"\n                     (click)=\"onEnter($event)\"\n                     >Send</button>\n                </span>\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        })
    ], ChatWindow);
    return ChatWindow;
}());
exports.ChatWindow = ChatWindow;
