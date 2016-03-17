hrBaseApp.controller('hrmsApproveCompOffCtrl', ['$scope', '$rootScope', 'approvalFctry', function ($scope, $rootScope, approvalFctry) {

    $scope.init = function(){
        $scope.getFiledCompOff($rootScope.userDetails);
    }
    
    $scope.approveCompOffGridOptions = {
        columnDefs: [
            {
                field: 'Name',
                displayName: 'Name'
            },
            {
                field: 'CompOffDate',
                displayName: 'CompOff Date',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'CompOffReason',
                displayName: 'CompOff Reason'
            },
            {
                field: 'CompOffStatus',
                displayName: 'CompOff Status'
            },
            {
                field: 'MarkStatus',
                displayName: 'Mark Status',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatus\(\'approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a> </hr> <a ng-click="grid.appScope.updateStatus\(\'rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>'
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
                alert(status + ' ' + rowId);
                $scope.approveCompOffGridOptions.data = response.data;
            }
        });
    }
    
    $scope.init();
}])