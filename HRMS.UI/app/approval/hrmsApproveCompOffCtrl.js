hrBaseApp.controller('hrmsApproveCompOffCtrl', ['$scope', '$rootScope', 'approvalFctry', function ($scope, $rootScope, approvalFctry) {

    $scope.init = function () {
        $scope.getFiledCompOff($rootScope.userDetails);
    }

    $scope.approveCompOffGridOptions = {
        enableSorting: true,
        enableFiltering: true,
        filter: true,
        columnDefs: [
            {
                field: 'CompOffDate.value',
                displayName: 'Date',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'CompOffReason.value',
                displayName: 'CompOff Reason'
            },
            {
                field: 'CompOffStatus.value',
                displayName: 'Approval Status'
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
            alert("CompOff " + status);
            $scope.getFiledCompOff({
                Id: $rootScope.userDetails.Id
            });

        });
    }

    $scope.init();
}])