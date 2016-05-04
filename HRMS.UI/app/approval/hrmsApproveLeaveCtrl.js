hrBaseApp.controller('hrmsApproveLeaveCtrl', ['$scope', '$rootScope', 'approvalFctry', '$state', function ($scope, $rootScope, approvalFctry, $state) {

    $scope.init = function () {
        $scope.getAppliedLeaves({
            Id: $rootScope.userDetails.Id
        })
    }

    $scope.approveLeaveGridOptions = {
        enableSorting: true,
        enableFiltering: true,
        filter: true,
        columnDefs: [
            {
                field: 'FromDate.value',
                displayName: 'From',
                cellFilter: 'date:\'dd-MMM-yyyy\'',

            },
            {
                field: 'ToDate.value',
                displayName: 'To',
                cellFilter: 'date:\'dd-MMM-yyyy\'',

            },
            {
                field: 'Reason.value',
                displayName: 'Reason',
                enableFiltering: false
            },
            {
                field: 'Status.value',
                displayName: 'Approval Status'
            },
            {
                field: 'Action',
                displayName: 'Action',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatus(\'Approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a></hr><a ng-click="grid.appScope.updateStatus(\'Rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>',
                enableFiltering: false
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
        if (status == 'Approved')
            _status = 18;
        else if (status == 'Rejected')
            _status = 19;

        approvalFctry.approveLeave({
            Id: rowId,
            Status: _status
        }).then(function (response) {
            alert("Leave " + status);
            $scope.getAppliedLeaves({
                Id: $rootScope.userDetails.Id
            });
        });
    }

    /*$scope.updateStatusRejection = function (status) {

        var _status;
        if (status == 'approved')
            _status = 18;
        else if (status == 'rejected')
            _status = 19;

        approvalFctry.approveLeave({
            Id: rowId,
            Status: _status
        }).then(function (response) {
            alert("Leave Is Rejected");
            $state.go('home.approval');

        });
    }*/

    $scope.init();
}])