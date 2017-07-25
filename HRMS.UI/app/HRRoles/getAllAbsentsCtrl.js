hrBaseApp.controller('getAllAbsentsCtrl', ['$scope', 'leaveFctry', '$rootScope', '$modal', function ($scope, leaveFctry, $rootScope, $modal) {
    'use strict';
    /* Initialize */
    $scope.init = function () {
        $scope.message = 'Hello, Welcome to Leave Page';
        $scope.getAllAbsentData();
        $scope.getAllAbsentsGridOptions = {
            enableSorting: true,
            enableFiltering: true,
            filter: true,
            data: null,
            columnDefs: [
                {
                    field: 'EmployeeName.value',
                    displayName: 'Employee Name',
                    enableColumnMenu: false,
                    headerCellClass: 'text-center'
                },
                {
                    field: 'AbsentDate.value',
                    displayName: 'DATE',
                    enableColumnMenu: false,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    headerCellClass: 'text-center',
                    cellClass: 'text-center'
                }
                , {
                    field: 'AbsentType.value',
                    displayName: 'ABSENT TYPE',
                    enableColumnMenu: false,
                    headerCellClass: 'text-center',
                    cellClass: 'text-center'
                }
                , {
                    field: 'StartTime.value',
                    displayName: 'START TIME',
                    enableColumnMenu: false,
                    headerCellClass: 'text-center',
                    cellClass: 'text-center'
                }
                , {
                    field: 'EndTime.value',
                    displayName: 'END TIME',
                    enableColumnMenu: false,
                    headerCellClass: 'text-center',
                    cellClass: 'text-center'
                }
            ]
        };
    }

    $scope.getAllAbsentData = function () {
        // alert(empData.EmpId);
        leaveFctry.getAllAbsents().then(function (response) {
            if (response.data != null) {
                $scope.getAllAbsentsGridOptions.data = response.data;
            }
        });
    }
    $scope.init();
}]);