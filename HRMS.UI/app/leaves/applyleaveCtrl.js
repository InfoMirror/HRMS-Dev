hrBaseApp.controller('applyleaveCtrl', ['$scope', 'leaveFctry', '$rootScope', '$modal', function ($scope, leaveFctry, $rootScope, $modal) {
    'use strict';

    $scope.init = function () {
        $scope.message = 'Hello, Welcome to CompOff Page';
        $scope.getAppliedLeaves({
            EmpId: $rootScope.userDetails.EmpId
        });
    }

    $scope.AppliedLeaveGridOptions = {
        enableSorting: true,
        data: null,
        columnDefs: [
            {
                field: 'FromDate',
                displayName: 'From Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'ToDate',
                displayName: 'To Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'EmployeeName',
                displayName: 'Name',
                enableColumnMenu: false
            },
            {
                field: 'Reason',
                displayName: 'Reason',
                enableColumnMenu: false

            },
            {
                field: 'Status',
                displayName: 'Current Status',
                enableColumnMenu: false
            }
        ]
    };


    $scope.getAppliedLeaves = function (empData) {
        alert(JSON.stringify(empData));
        leaveFctry.getAppliedLeaves(empData).then(function (response) {
            console.log(response.data);
            if (response.data != 'No Records Found')
                $scope.AppliedLeaveGridOptions.data = response.data;
        });
    }

    $scope.openModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '/app/leaves/applyleaveMdlCtrl.html',
            controller: 'applyleaveMdlCtrl',
            size: 'md',
            resolve: {
                aValue: function () {
                    return $rootScope.userDetails.EmpId
                }
            }
        });
        modalInstance.result.then(function (paramFromDialog) {
            debugger;
            $scope.paramFromDialog = paramFromDialog;
            $scope.getAppliedLeaves({
                EmpId: $rootScope.userDetails.EmpId
            });
        });
    }

    $scope.init();
}]);