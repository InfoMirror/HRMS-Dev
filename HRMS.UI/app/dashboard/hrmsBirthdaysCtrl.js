hrBaseApp.controller('hrmsBirthdaysCtrl', ['$scope', 'dashboardFctry', function ($scope, dashboardFctry) {
    'use strict';

    /*Initialize*/
    $scope.init = function () {
        $scope.message = 'No Upcoming Birthdays now';
        $scope.getData();
    }

    $scope.birthdaysGridOptions = {
        columnDefs: [
            {
                field: 'Name',
                displayName: 'Name'
            },
            {
                field: 'DOB',
                displayName: 'Birthday',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            }
        ]
    };

    $scope.getData = function () {
        dashboardFctry.getBirthdays().then(function (response) {
            $scope.birthdaysGridOptions.data = response.data;
        });
    }

    $scope.init();
}]);