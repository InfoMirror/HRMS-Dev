hrBaseApp.controller('hrmsCompOffsCtrl', ['$scope', 'leaveFctry', '$rootScope', '$modal', 'uiGridConstants', function ($scope, leaveFctry, $rootScope, $modal, uiGridConstants) {
    'use strict';
    // alert(0);
    /* Initialize */
    $scope.init = function () {
        $scope.message = 'Hello, Welcome to CompOff Page';
        $scope.getCompOffsData($rootScope.userDetails.EmpId);
        //    $scope.markCompOff($rootScope.userDetails.Id);
    }

    $scope.CompOffsGridOptions = {
        enableSorting: true,
        enableFiltering: true,
        filter: true,
        data: null,
        columnDefs: [
            {
                field: 'CompOffDate.value',
                displayName: 'COMP OFF DATE',
                enableColumnMenu: false,
                cellFilter: 'date:\'dd-MMM-yyyy\'',
                filter: {
                    condition: uiGridConstants.filter.CONTAINS
                }
            },
           /* {
                field: 'EmployeeName',
                displayName: 'Name',
                filterCellFiltered:true,
                enableColumnMenu: false
            },*/
            {
                field: 'IsManual.value',
                displayName: 'SYTEM IDENTIFIED',
                enableColumnMenu: false,
                cellTemplate: '<input type="checkbox" disabled ng-checked="grid.appScope.isSystemIdentified(row.entity.IsManual.value)">'
            },
            {
                field: 'CompOffStatus.value',
                displayName: 'APPROVAL STATUS',
                enableColumnMenu: false,
                filter: {
                    condition: uiGridConstants.filter.CONTAINS
                },
                cellTemplate: '<div>{{row.entity.CompOffStatus.value}}<a ng-click="grid.appScope.markCompOff(row.entity.Id.value)" ng-show="grid.appScope.enableDisableLink(row.entity.CompOffStatus.value)" style="margin-right: 8%;float: right;" href="">File CompOff</a></div>'
            }
        ]
    };
    /* $scope.insertCompOff = function () {

     }*/
    $scope.getCompOffsData = function (empData) {
        leaveFctry.getCompOffs({
            EmpId: empData
        }).then(function (response) {
            $scope.CompOffsGridOptions.data = response.data;
        });
    }

    $scope.isSystemIdentified = function (isManual) {
        if(isManual){
            return false;
        }else{
            return true;
        }
    }

    /*$scope.insertCompOff = function (CompOffData) {
        leaveFctry.insertCompOff(CompOffData).then(function (response) {
            if (response.data == "CompOff Applied") {
                //  console.log(response.data);
                $scope.getCompOffsData($rootScope.userDetails.EmpId.value);
            }
        });
    }*/


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
            debugger;
           // $scope.paramFromDialog = paramFromDialog;
            $scope.getCompOffsData($rootScope.userDetails.EmpId);
        });
    }


    $scope.markCompOff = function (rowId) {
        leaveFctry.markCompOff({
            Id: rowId
        }).then(function (response) {
            if (response.data == "CompOff Marked") {
                // $scope.markCompOff();
                alert('CompOff Filed Successfully !!! Please wait for Approval');
                $scope.getCompOffsData($rootScope.userDetails);
            }
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