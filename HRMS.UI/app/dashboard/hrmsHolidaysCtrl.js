hrBaseApp.controller('hrmsHolidaysCtrl', ['$scope', 'dashboardFctry', function ($scope, dashboardFctry) {
    'use strict';

    /*Initialize*/
    $scope.init = function () {
        $scope.message = 'There is no Upcoming Holiday now';
        $scope.getData();
    }

    $scope.HolidaysGridOptions = {
        columnDefs: [
            {
                field: 'FestivalName',
                displayName: 'Name'
            },
            {
                field: 'FestivalDate',
                displayName: 'Festival',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            }
        ]
    };

    $scope.getData = function () {
        dashboardFctry.getHolidays().then(function (response) {
            console.log(response.data);
            $scope.HolidaysGridOptions.data = response.data;
        });
    }

    $scope.init();
}]);