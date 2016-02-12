hrBaseApp.directive('hrFooterDrctv', [
    function () {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-footer-drctv.html';

        p.link = function ($scope, element, attributes, controller) {
            $scope.currentYear = moment().format('YYYY');
        }

        return p;
    }
])