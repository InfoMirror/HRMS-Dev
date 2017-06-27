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
                    field: 'AbsentDate.value',
                    displayName: 'DATE',
                    enableColumnMenu: false,
                    cellFilter: 'date:\'dd-MMM-yyyy\''
            }
            , {
                    field: 'AbsentType.value',
                    displayName: 'ABSENT TYPE',
                    enableColumnMenu: false
            }         
            , {
                    field: 'StartTime.value',
                    displayName: 'START TIME',
                    enableColumnMenu: false
            }
            , {
                    field: 'EndTime.value',
                    displayName: 'END TIME',
                    enableColumnMenu: false
            }                  
        ]
        };
    }

    $scope.getAllAbsentData = function () {
        // alert(empData.EmpId);
        leaveFctry.getAllAbsents().then(function (response) {
            console.log(response.data);
            if (response.data != null) {
                $scope.getAllAbsentsGridOptions.data = response.data;
            }
        });
    }
    $scope.init();
}]);