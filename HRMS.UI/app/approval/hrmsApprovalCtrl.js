hrBaseApp.controller('hrmsApprovalCtrl', ['$scope', '$rootScope', 'approvalFctry', function ($scope, $rootScope, approvalFctry) {
    'use strict';

    /*Initialize
    $scope.init = function () {
        $scope.getFiledCompOff($rootScope.userDetails);
        $scope.getFiledOD($rootScope.userDetails);
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

    $scope.approveODGridOptions = {
        columnDefs: [
            {
                field: 'Name',
                displayName: 'Name'
            },
            {
                field: 'AbsentDate',
                displayName: 'Absent Date',
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
            {
                field: 'ODReason',
                displayName: 'OD Reason'
            },
            {
                field: 'ODStatus',
                displayName: 'OD Status'
            },
            {
                field: 'MarkStatus',
                displayName: 'Mark Status',
                cellTemplate: '<div><a ng-click="grid.appScope.updateStatusOD(\'approved\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Approve</a></hr><a ng-click="grid.appScope.updateStatusOD(\'rejected\',row.entity.Id)" style="margin-right: 8%;float: right;" href="">Reject</a></div>'
            }
        ]
    };

    $scope.getFiledCompOff = function (rowId) {

        approvalFctry.getFiledCompOff(rowId).then(function (response) {
            $scope.approveCompOffGridOptions.data = response.data;
        });
    }

    $scope.getFiledOD = function (rowId) {
        approvalFctry.getFiledOD(rowId).then(function (response) {
            $scope.approveODGridOptions.data = response.data;
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
    
    
     $scope.updateStatusOD = function (status, rowId) {
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
            if (response.data == "Status Updated") {
                alert(status + ' ' + rowId);
                $scope.approveODGridOptions.data = response.data;
            }
        });
    }

    $scope.init();*/
}]);