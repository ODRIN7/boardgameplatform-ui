"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ChatExampleData_1 = require("../../../shared/domain/ChatExampleData");
var ChatComponent = (function () {
    function ChatComponent(messagesService, threadsService, userService) {
        this.messagesService = messagesService;
        this.threadsService = threadsService;
        this.userService = userService;
        ChatExampleData_1.ChatExampleData.init(messagesService, threadsService, userService);
    }
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'bga-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.scss'],
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
