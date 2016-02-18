hrBaseApp.controller('hrmsLeavesCtrl', ['$scope', 'leaveFctry', '$rootScope', function ($scope, leaveFctry, $rootScope) {
    'use strict';
    /* Initialize */
    $scope.init = function () {
        $scope.message = 'Hello, Welcome to Leave Page';
        $scope.getAbsentData($rootScope.userDetails);
    }

    $scope.absentGridOptions = {
        enableSorting: true,
        data: null,
        columnDefs: [
            {
                field: 'AbsentDate',
                displayName: 'Absent Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'AbsentType',
                displayName: 'Absent Type',
                enableColumnMenu: false
            },
            {
                field: 'EmployeeName',
                displayName: 'Name',
                enableColumnMenu: false
            },
            {
                field: 'StartTime',
                displayName: 'Start Time',
                enableColumnMenu: false
            },
            {
                field: 'EndTime',
                displayName: 'End Time',
                enableColumnMenu: false
            },
            {
                field: 'ODStatus',
                displayName: 'OD Status',
                enableColumnMenu: false
            },
            {
                field: 'IsAdminEntry',
                displayName: 'Admin Entry',
                enableColumnMenu: false,
                cellTemplate: '<input type="checkbox" disabled ng-model="row.entity.IsAdminEntry">'
            }
        ]
    };

    $scope.getAbsentData = function (empData) {
        leaveFctry.getAbsents(empData).then(function (response) {
            $scope.absentGridOptions.data = response.data;
        });
    }

    $scope.init();
}]);