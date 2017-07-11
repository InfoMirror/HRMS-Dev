hrBaseApp.controller('confirmationBoxMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry', '$rootScope', '$state', 'dashboardFctry', '$filter',
    function ($scope, $modalInstance, aValue, leaveFctry, $rootScope, $state, dashboardFctry, $filter) {
        'use strict';
        $scope.status = aValue;
        $scope.submit = function (status) {
            $modalInstance.close(status);
        }
        $scope.close = function () {
            $modalInstance.close(false);
        }
    }
])