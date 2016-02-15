var angular = require("angular");
var uirouter = require("angular-ui-router");
var routing = require("./app.config");

var appService = require("./app.service");
var homeDirective = require("./home/home.directive");
var imgDirective = require("./img/img.directive");
var themeDirective = require("./theme/theme.directive");
var imgPickerDirective = require("./img-picker/img-picker.directive");
var themePickerDirective = require("./theme-picker/theme-picker.directive");

angular.module('app', [uirouter])
  .config(routing)
  .factory('pdpgService', appService)
  .directive('pdpgHomePage', homeDirective)
  .directive('pdpgImg', imgDirective)
  .directive('pdpgTheme', themeDirective)
  .directive('pdpgImgPicker', imgPickerDirective)
  .directive('pdpgThemePicker', themePickerDirective);
