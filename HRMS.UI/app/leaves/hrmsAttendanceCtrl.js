hrBaseApp.controller('hrmsAttendanceCtrl', ['$scope', 'dashboardFctry', '$rootScope', function ($scope, dashboardFctry, $rootScope) {
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
}]);