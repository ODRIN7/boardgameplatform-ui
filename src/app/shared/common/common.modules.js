"use strict";
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var core_1 = require('@covalent/core');
var highlight_1 = require('@covalent/highlight');
var markdown_1 = require('@covalent/markdown');
var charts_1 = require('@covalent/charts');
var material_1 = require("@angular/material");
exports.COMMON_ROOT_MODULES = [
    platform_browser_1.BrowserModule,
    forms_1.FormsModule,
    http_1.HttpModule,
    common_1.CommonModule,
    forms_1.ReactiveFormsModule,
    material_1.MdButtonModule.forRoot(),
    material_1.MdButtonToggleModule.forRoot(),
    material_1.MdCardModule.forRoot(),
    material_1.MdCheckboxModule.forRoot(),
    material_1.MdCoreModule.forRoot(),
    material_1.MdDialogModule.forRoot(),
    material_1.MdGridListModule.forRoot(),
    material_1.MdIconModule.forRoot(),
    material_1.MdInputModule.forRoot(),
    material_1.MdListModule.forRoot(),
    material_1.MdMenuModule.forRoot(),
    material_1.MdProgressBarModule.forRoot(),
    material_1.MdProgressCircleModule.forRoot(),
    material_1.MdRadioModule.forRoot(),
    material_1.MdSelectModule.forRoot(),
    material_1.MdSidenavModule.forRoot(),
    material_1.MdSlideToggleModule.forRoot(),
    material_1.MdSliderModule.forRoot(),
    material_1.MdSnackBarModule.forRoot(),
    material_1.MdTabsModule.forRoot(),
    material_1.MdToolbarModule.forRoot(),
    material_1.MdTooltipModule.forRoot(),
    core_1.CovalentCoreModule.forRoot(),
    charts_1.CovalentChartsModule.forRoot(),
    highlight_1.CovalentHighlightModule.forRoot(),
    markdown_1.CovalentMarkdownModule.forRoot(),
];
exports.COMMON_CHILD_MODULES = [
    common_1.CommonModule,
    forms_1.FormsModule,
    http_1.HttpModule,
    material_1.MdButtonModule,
    material_1.MdButtonToggleModule,
    material_1.MdCardModule,
    material_1.MdCheckboxModule,
    material_1.MdCoreModule,
    material_1.MdDialogModule,
    material_1.MdGridListModule,
    material_1.MdIconModule,
    material_1.MdInputModule,
    material_1.MdListModule,
    material_1.MdMenuModule,
    material_1.MdProgressBarModule,
    material_1.MdProgressCircleModule,
    material_1.MdRadioModule,
    material_1.MdSelectModule,
    material_1.MdSidenavModule,
    material_1.MdSlideToggleModule,
    material_1.MdSliderModule,
    material_1.MdSnackBarModule,
    material_1.MdTabsModule,
    material_1.MdToolbarModule,
    material_1.MdTooltipModule,
    core_1.CovalentCoreModule,
    charts_1.CovalentChartsModule,
    highlight_1.CovalentHighlightModule,
    markdown_1.CovalentMarkdownModule,
];
