"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var services_1 = require("../../../services");
var UsersFormComponent = (function () {
    function UsersFormComponent(_usersService, _route, media) {
        this._usersService = _usersService;
        this._route = _route;
        this.media = media;
    }
    UsersFormComponent.prototype.goBack = function () {
        window.history.back();
    };
    UsersFormComponent.prototype.ngAfterViewInit = function () {
        // broadcast to all listener observables when loading the page
        this.media.broadcast();
    };
    UsersFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.url.subscribe(function (url) {
            _this.action = (url.length > 1 ? url[1].path : 'add');
        });
        this._route.params.subscribe(function (params) {
            var userId = params.id;
            _this._usersService.get(userId).subscribe(function (user) {
                _this.displayName = user.displayName;
                _this.email = user.email;
                _this.admin = (user.siteAdmin === 1 ? true : false);
                _this.id = user.id;
            });
        });
    };
    UsersFormComponent.prototype.save = function () {
        var _this = this;
        var siteAdmin = (this.admin ? 1 : 0);
        var now = new Date();
        this.user = {
            displayName: this.displayName,
            email: this.email,
            siteAdmin: siteAdmin,
            id: this.id || this.displayName.replace(/\s+/g, '.'),
            created: now,
            lastAccess: now,
        };
        if (this.action === 'add') {
            this._usersService.create(this.user).subscribe(function () {
                _this.goBack();
            });
        }
        else {
            this._usersService.update(this.id, this.user).subscribe(function () {
                _this.goBack();
            });
        }
    };
    return UsersFormComponent;
}());
UsersFormComponent = __decorate([
    core_1.Component({
        selector: 'qs-user-form',
        templateUrl: './form.component.html',
        styleUrls: ['./form.component.scss'],
        viewProviders: [services_1.UsersService],
    })
], UsersFormComponent);
exports.UsersFormComponent = UsersFormComponent;
