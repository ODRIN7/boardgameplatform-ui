"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AuthenticatedGuard = (function () {
    function AuthenticatedGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthenticatedGuard.prototype.canActivate = function (next, state) {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    };
    AuthenticatedGuard = __decorate([
        core_1.Injectable()
    ], AuthenticatedGuard);
    return AuthenticatedGuard;
}());
exports.AuthenticatedGuard = AuthenticatedGuard;
