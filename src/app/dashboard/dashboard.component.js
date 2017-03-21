"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var services_1 = require("../../services");
var data_1 = require("./data");
var DashboardComponent = (function () {
    function DashboardComponent(_titleService, _itemsService, _usersService, _alertsService, _productsService, _loadingService) {
        this._titleService = _titleService;
        this._itemsService = _itemsService;
        this._usersService = _usersService;
        this._alertsService = _alertsService;
        this._productsService = _productsService;
        this._loadingService = _loadingService;
        this.view = [700, 400];
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = true;
        this.xAxisLabel = '';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Sales';
        this.colorScheme = {
            domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
        };
        // line, area
        this.autoScale = true;
        // Chart
        this.multi = data_1.multi.map(function (group) {
            group.series = group.series.map(function (dataItem) {
                dataItem.name = new Date(dataItem.name);
                return dataItem;
            });
            return group;
        });
    }
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._titleService.setTitle('BoardGameArena');
        this._loadingService.register('items.load');
        this._itemsService.query().subscribe(function (items) {
            _this.items = items;
            setTimeout(function () {
                _this._loadingService.resolve('items.load');
            }, 750);
        }, function (error) {
            _this._itemsService.staticQuery().subscribe(function (items) {
                _this.items = items;
                setTimeout(function () {
                    _this._loadingService.resolve('items.load');
                }, 750);
            });
        });
        this._loadingService.register('alerts.load');
        this._alertsService.query().subscribe(function (alerts) {
            _this.alerts = alerts;
            setTimeout(function () {
                _this._loadingService.resolve('alerts.load');
            }, 750);
        });
        this._loadingService.register('products.load');
        this._productsService.query().subscribe(function (products) {
            _this.products = products;
            setTimeout(function () {
                _this._loadingService.resolve('products.load');
            }, 750);
        });
        this._loadingService.register('favorites.load');
        this._productsService.query().subscribe(function (products) {
            _this.products = products;
            setTimeout(function () {
                _this._loadingService.resolve('favorites.load');
            }, 750);
        });
        this._loadingService.register('users.load');
        this._usersService.query().subscribe(function (users) {
            _this.users = users;
            setTimeout(function () {
                _this._loadingService.resolve('users.load');
            }, 750);
        }, function (error) {
            _this._usersService.staticQuery().subscribe(function (users) {
                _this.users = users;
                setTimeout(function () {
                    _this._loadingService.resolve('users.load');
                }, 750);
            });
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'qs-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss'],
        viewProviders: [services_1.ItemsService, services_1.UsersService, services_1.ProductsService, services_1.AlertsService],
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
