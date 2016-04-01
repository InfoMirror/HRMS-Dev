hrBaseApp.controller('hrmsApproveCompOffCtrl', ['$scope', '$rootScope', 'approvalFctry', 'uiGridConstants', function ($scope, $rootScope, approvalFctry, uiGridConstants) {

    $scope.init = function () {
        $scope.getFiledCompOff($rootScope.userDetails);
    }

    $scope.approveCompOffGridOptions = {
        enableSorting: true,
        enableFiltering: true,
        filter: true,
        columnDefs: [
            {
                field: 'CompOffDate',
                displayName: 'Date',
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                filter: {
                    condition: uiGridConstants.filter.CONTAINS
                }
            },
            {
                field: 'CompOffReason',
                displayName: 'CompOff Reason'
            },
            {
                field: 'CompOffStatus',
                displayName: 'Approval Status',
                filter: {
                    condition: uiGridConstants.filter.CONTAINS
                }
            },
            {
                field: 'Action',
                displayName: 'Action',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatus\(\'approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a> </hr> <a ng-click="grid.appScope.updateStatus\(\'rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>',
                enableFiltering: false

            }
        ]
    };

    $scope.getFiledCompOff = function (rowId) {

        approvalFctry.getFiledCompOff(rowId).then(function (response) {
            $scope.approveCompOffGridOptions.data = response.data;
        });
    }

    $scope.updateStatus = function (status, rowId) {
        var compOffStatus;
        if (status == "approved") {
            compOffStatus = 18;
        } else if (status == "rejected") {
            compOffStatus = 19;
        }
        approvalFctry.approveCompOff({
            Id: rowId,
            compOffStatus: compOffStatus
        }).then(function (response) {
            if (response.data == "Status Updated") {
                $scope.getFiledCompOff($rootScope.userDetails);
                //$scope.approveCompOffGridOptions.data = response.data;
            }
        });
    }

    $scope.init();
}])