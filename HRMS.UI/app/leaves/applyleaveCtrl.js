hrBaseApp.controller('applyleaveCtrl', ['$scope', 'leaveFctry', '$rootScope', '$modal', 'uiGridConstants', function ($scope, leaveFctry, $rootScope, $modal, uiGridConstants) {
    'use strict';

    $scope.init = function () {
        $scope.message = 'Hello, Welcome to CompOff Page';
        $scope.getAppliedLeaves({
            EmpId: $rootScope.userDetails.EmpId
        });
    }

    $scope.AppliedLeaveGridOptions = {
        enableSorting: true,
        enableFiltering: true,
        filter: true,
        data: null,
        columnDefs: [
            {
                field: 'FromDate.value',
                displayName: 'From Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                headerCellClass: 'text-center',
                cellClass: 'text-center'
                /*filter: {
                    condition: uiGridConstants.filter.CONTAINS
                }*/
            },
            {
                field: 'ToDate.value',
                displayName: 'To Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                headerCellClass: 'text-center'
            },
       
            {
                field: 'Reason.value',
                displayName: 'Reason',
                enableColumnMenu: false,
                headerCellClass: 'text-center'

            },
            {
                field: 'Status.value',
                displayName: 'Current Status',
                enableColumnMenu: false,
                headerCellClass: 'text-center'
            }
        ]
    };


    $scope.getAppliedLeaves = function (empData) {
        leaveFctry.getAppliedLeaves(empData).then(function (response) {
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
            $scope.paramFromDialog = paramFromDialog;
            $scope.getAppliedLeaves({
                EmpId: $rootScope.userDetails.EmpId
            });
        });
    }

    $scope.init();
}]);