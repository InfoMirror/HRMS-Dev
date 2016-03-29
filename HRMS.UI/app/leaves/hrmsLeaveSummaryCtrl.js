hrBaseApp.controller('hrmsLeaveSummaryCtrl', ['$scope', '$rootScope', 'dashboardFctry', function ($scope, $rootScope, dashboardFctry) {
    'use strict';

    $scope.init = function () {
        $scope.getLeaveSummary({
            EmpId: $rootScope.userDetails.EmpId
        });
    }

    $scope.getLeaveSummary = function (empId) {
        dashboardFctry.getLeaveSummary(empId).then(function (response) {
            console.log(response.data);
            $scope.leaveData = response.data[0];
        });
    }

    $scope.init();
}])