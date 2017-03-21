"use strict";
var roles_1 = require("./roles");
var User = (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
        this.authorities = [roles_1.Role.USER_ROLE];
        this.boardgames = [];
    }
    User.prototype.addBoardGame = function (boardgame) {
        this.boardgames.push(boardgame);
    };
    User.toUser = function (userData) {
        return new User((userData)['user_name'], (userData)['authorities']);
    };
    User.prototype.getusername = function () {
        return this.username;
    };
    User.prototype.setusername = function (value) {
        this.username = value;
    };
    User.prototype.getboardgames = function () {
        return this.boardgames;
    };
    User.prototype.getauthorities = function () {
        return this.authorities;
    };
    User.prototype.setauthorities = function (value) {
        this.authorities = value;
    };
    return User;
}());
exports.User = User;
