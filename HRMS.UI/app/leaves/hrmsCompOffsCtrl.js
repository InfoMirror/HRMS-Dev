hrBaseApp.controller('hrmsCompOffsCtrl', ['$scope', 'leaveFctry', '$rootScope', function ($scope, leaveFctry, $rootScope) {
    'use strict';
    /* Initialize */
    $scope.init = function () {
        $scope.message = 'Hello, Welcome to CompOff Page';
        $scope.getCompOffsData($rootScope.userDetails);
    }

    $scope.CompOffsGridOptions = {
        enableSorting: true,
        data: null,
        columnDefs: [
            {
                field: 'CompOffDate',
                displayName: 'CompOff Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'EmployeeName',
                displayName: 'Name',
                enableColumnMenu: false
            },
           
            {
                field: 'IsManual',
                displayName: 'Is Manual',
                enableColumnMenu: false,
               cellTemplate: '<input type="checkbox" disabled ng-model="row.entity.IsManual">'
            }
        ]
    };

    $scope.getCompOffsData = function (empData) {
        leaveFctry.getCompOffs(empData).then(function (response) {
             console.log(response.data);
            $scope.CompOffsGridOptions.data = response.data;
        });
    }

    $scope.init();
}]);