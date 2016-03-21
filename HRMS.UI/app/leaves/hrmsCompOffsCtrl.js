hrBaseApp.controller('hrmsCompOffsCtrl', ['$scope', 'leaveFctry', '$rootScope','$modal', function ($scope, leaveFctry, $rootScope, $modal) {
    'use strict';
    /* Initialize */
    $scope.init = function () {
        $scope.message = 'Hello, Welcome to CompOff Page';
        $scope.getCompOffsData($rootScope.userDetails);
    }

    $scope.CompOffsGridOptions = {
        enableSorting: true,
         enableCellEditOnFocus: true,
        filter:true,
        data: null,
        columnDefs: [
            {
                field: 'CompOffDate',
                displayName: 'Date',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\''
            },
           /* {
                field: 'EmployeeName',
                displayName: 'Name',
                enableColumnMenu: false
            },*/
            {
                field: 'IsManual',
                displayName: 'System Identified',
                enableColumnMenu: false,
                cellTemplate: '<input type="checkbox" disabled ng-model="row.entity.IsManual">'
            },
        /*    {
                field: 'CompOffStatus',
                displayName: 'Approval Status',
                enableColumnMenu: false
            }*/
             ,{
                field: 'CompOffStatus',
                displayName: 'Approval Status',
                enableColumnMenu: false,
                cellTemplate: '<div>{{row.entity.CompOffStatus}}<a ng-click="grid.appScope.openModal(row.entity.Id)" ng-show="grid.appScope.enableDisableLink(row.entity.CompOffStatus)" style="margin-right: 8%;float: right;" href="">File CompOff</a></div>'
            }
        ]
    };
   /* $scope.insertCompOff = function () {

    }*/
    $scope.getCompOffsData = function (empData) {
        leaveFctry.getCompOffs(empData).then(function (response) {
            console.log(response.data);
            $scope.CompOffsGridOptions.data = response.data;
        });
    }


    $scope.insertCompOff = function (CompOffData) {
        leaveFctry.insertCompOff(CompOffData).then(function (response) {
            if (response.data == "CompOff Applied") {
              //  console.log(response.data);
                $scope.getCompOffsData($rootScope.userDetails);
            }
        });
    }


    $scope.openModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '/app/leaves/applyCompOffMdlCtrl.html',
            controller: 'applyCompOffMdlCtrl',
            size: 'md',
            resolve: {
                aValue: function () {
                    return $rootScope.userDetails.EmpId
                }
            }
        });
        modalInstance.result.then(function (paramFromDialog) {
            $scope.paramFromDialog = paramFromDialog;
            $scope.getCompOffsData($rootScope.userDetails);
        });
    }

    $scope.IsManualTrue = function (IsManual) {
        if (IsManual == 1)
            return true
        else
            IsManual = 1
    }

    
    $scope.enableDisableLink = function (compOffStatus) {
        if (compOffStatus == "Not Filed")
            return true
        else
            return false;
    }

    
    $scope.init();
}]);