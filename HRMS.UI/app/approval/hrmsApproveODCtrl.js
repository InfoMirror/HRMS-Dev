hrBaseApp.controller('hrmsApproveODCtrl', ['$scope', '$rootScope', 'approvalFctry', function ($scope, $rootScope, approvalFctry) {

    $scope.init = function () {
        $scope.getFiledOD($rootScope.userDetails);
    }

    $scope.approveODGridOptions = {
        enableSorting: true,
        enableFiltering: true,
        filter: true,
        columnDefs: [
            {
                field: 'AbsentDate.value',
                displayName: 'Date',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'ODReason.value',
                displayName: 'Reason',
                enableFiltering: false
            },
            {
                field: 'ODStatus.value',
                displayName: 'Approval Status'
            },
            {
                field: 'Action',
                displayName: 'Action',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatus(\'approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a></hr><a ng-click="grid.appScope.updateStatus(\'rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>'
            }
        ]
    };

    $scope.getFiledOD = function (rowId) {
        approvalFctry.getFiledOD(rowId).then(function (response) {
            $scope.approveODGridOptions.data = response.data;
        });
    }

    $scope.updateStatus = function (status, rowId) {
        var ODStatus;
        if (status == "approved") {
            ODStatus = 18;
        } else if (status == "rejected") {
            ODStatus = 19;
        }
        approvalFctry.approveOD({
            Id: rowId,
            ODStatus: ODStatus
        }).then(function (response) {
            alert("OD is " + status)
            $scope.getFiledOD({
                rowId Id: $rootScope.userDetails.Id
            });
        });
    }

    $scope.init();
}])