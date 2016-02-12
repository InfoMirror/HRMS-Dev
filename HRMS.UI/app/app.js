'use strict';

var hrBaseApp = angular.module('hrBaseApp', ['ngResource', 'ui.router', 'ngRoute', 'LocalStorageModule', 'angular.chosen',
    'ngTouch', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav',
    'uiSwitch', 'ui.keypress', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.bootstrap', 'ui.utils'])
.controller('hrBaseMainCtrl', ['$scope', function ($scope) {

}]);

// Bootstrap  to get environment variables beforehand
//fetchData().then(bootstrapApplication);
//function fetchData() {
//    var initInjector = angular.injector(["ng"]);
//    var $http = initInjector.get("$http");
//    return $http.get("/app/appConstant.json").then(function (response) {
//        hrmsSettingsVal.apiUrl = response.data.apiUrl;
//        hrBaseApp.value('hrmsSettingsVal', hrmsSettingsVal);
//    }, function (errorResponse) {
//        // Handle error case
//    });
//}
//function bootstrapApplication() {
//    angular.element(document).ready(function () {
//        angular.bootstrap(document, ["hrBaseApp"]);
//    });
//}