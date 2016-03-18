hrBaseApp.controller('hrmsApproveLeaveCtrl', ['$scope', '$rootScope', 'approvalFctry','$state', function ($scope, $rootScope, approvalFctry,$state) {

    $scope.init = function () {
        $scope.getAppliedLeaves({
            Id: $rootScope.userDetails.Id
        })
    }

    $scope.approveLeaveGridOptions = {
        columnDefs: [
            {
                field: 'Name',
                displayName: 'Name'
            },
            {
                field: 'FromDate',
                displayName: 'From',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'ToDate',
                displayName: 'To',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'Reason',
                displayName: 'Reason'
            },
            {
                field: 'Status',
                displayName: 'Status'
            },
            {
                field: 'Action',
                displayName: 'Action',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatus(\'approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a></hr><a ng-click="grid.appScope.updateStatus(\'rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>'
            }
        ]
    }

    $scope.getAppliedLeaves = function (userId) {
        approvalFctry.getAppliedLeaves(userId).then(function (response) {
            $scope.approveLeaveGridOptions.data = response.data;
        });
    }

    $scope.updateStatus = function (status, rowId) {
        var _status;
        if (status == 'approved')
            _status = 18;
        else if (status == 'rejected')
            _status = 19;

        approvalFctry.approveLeave({
            Id: rowId,
            Status: _status
        }).then(function (response) {
             alert("Leave Is Approved");
                $state.go('home.approval');
          /*  $scope.getAppliedLeaves({
                Id: $rootScope.userDetails.Id
            });*/
        });
    }

    $scope.init();
}])