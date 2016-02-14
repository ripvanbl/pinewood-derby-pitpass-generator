var angular = require("angular");
var uirouter = require("angular-ui-router");
var routing = require("./app.config");

var homeDirective = require("./home/home.directive");

angular.module('app', [uirouter])
  .config(routing)
  .directive('pdpgHomePage', homeDirective);
