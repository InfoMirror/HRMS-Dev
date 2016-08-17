hrBaseApp.controller('hrmsAnniversaryCtrl', ['$scope', 'dashboardFctry', function ($scope, dashboardFctry) {
    'use strict';

    /*Initialize*/
    $scope.init = function () {
        $scope.message = 'No Upcoming Work Anniversaries now !!!!!';
        $scope.getData();
    }

    $scope.anniversaryGridOptions = {
        columnDefs: [
            {
                field: 'Name',
                displayName: 'Name'
            },
            {
                field: 'DOJ',
                displayName: 'Date of Joining',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            }
        ]
    };

    $scope.getData = function () {
        dashboardFctry.getAnniversary().then(function (response) {
            $scope.AnniversaryGridOptions.data = response.data;
        });
    }

    $scope.init();
}]);