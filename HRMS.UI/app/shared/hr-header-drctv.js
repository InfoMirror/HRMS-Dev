hrBaseApp.directive('hrHeaderDrctv', [
    '$state', '$log',
    function ($state, $log) {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-header-drctv.html';

        //p.link = function ($scope, element, attributes, controller) {
        //    App.baseUi.basics();
        //    App.baseUi.handleScrollbars();
        //    App.baseUi.navbarHelpers();
        //    App.baseUi.scrollTopBtn();

        //    //#region=== Private Scope Methods ===


        //    //#endregion
        //}

        return p;
    }
])