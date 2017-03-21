"use strict";
var Boardgame = (function () {
    function Boardgame(id, shortDescription) {
        this._id = id;
        this._shortDescription = shortDescription;
    }
    Object.defineProperty(Boardgame.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Boardgame.prototype, "shortDescription", {
        get: function () {
            return this._shortDescription;
        },
        set: function (value) {
            this._shortDescription = value;
        },
        enumerable: true,
        configurable: true
    });
    return Boardgame;
}());
exports.Boardgame = Boardgame;
