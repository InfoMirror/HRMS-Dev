hrBaseApp.controller('hrmsApproveLeaveCtrl', ['$scope', '$rootScope', 'approvalFctry', '$state', 'uiGridConstants', function ($scope, $rootScope, approvalFctry, $state, uiGridConstants) {

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
                field: 'FromDate',
                displayName: 'From',
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                filter: {
                    condition: uiGridConstants.filter.CONTAINS
                }
            },
            {
                field: 'ToDate',
                displayName: 'To',
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                filter: {
                    condition: uiGridConstants.filter.CONTAINS
                }
            },
            {
                field: 'Reason',
                displayName: 'Reason',
                enableFiltering: false
            },
            {
                field: 'Status',
<<<<<<< HEAD
                displayName: 'Status',
                enableFiltering: false
            },
            {
                field: 'Action',
                displayName: 'Approval Status',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatus(\'approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a></hr><a ng-click="grid.appScope.updateStatus(\'rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>',
                filter: {
                    condition: uiGridConstants.filter.CONTAINS
                }
=======
                displayName: 'Approval Status'
            },
            {
                field: 'Action',
                displayName: 'Action',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatus(\'approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a></hr><a ng-click="grid.appScope.updateStatus(\'rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>'
>>>>>>> origin/master
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