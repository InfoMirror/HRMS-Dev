hrBaseApp.controller('hrmsLeavesCtrl', ['$scope', 'leaveFctry', '$rootScope', '$modal', function ($scope, leaveFctry, $rootScope, $modal) {
    'use strict';
    /* Initialize */
    $scope.init = function () {
        $scope.message = 'Hello, Welcome to Leave Page';
        $scope.getAbsentData($rootScope.userDetails);
        $scope.absentGridOptions = {
            enableSorting: true,
            enableFiltering: true,
            filter: true,
            data: null,
            columnDefs: [
                {
                    field: 'AbsentDate.value',
                    displayName: 'DATE',
                    enableColumnMenu: false,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    headerCellClass: 'text-center'
            }
            , {
                    field: 'AbsentType.value',
                    displayName: 'ABSENT TYPE',
                    enableColumnMenu: false,
                    headerCellClass: 'text-center'
            }
       
            , {
                    field: 'StartTime.value',
                    displayName: 'START TIME',
                    enableColumnMenu: false
            }
            , {
                    field: 'EndTime.value',
                    displayName: 'END TIME',
                    enableColumnMenu: false
            }
            , {
                    field: 'ODStatus.value',
                    displayName: 'APPROVAL STATUS',
                    enableColumnMenu: false,
                    cellTemplate: '<div>{{row.entity.ODStatus.value}}<a ng-click="grid.appScope.openModal(row.entity.Id.value)" ng-show="grid.appScope.enableDisableLink(row.entity.ODStatus.value)" style="margin-right: 8%;float: right;" href="">File OD</a></div>'
            }
            /*,{
                field: 'IsAdminEntry',
                displayName: 'Admin Entry',
                enableColumnMenu: false,
                cellTemplate: '<input type="checkbox" disabled ng-click="alert(row.entity.IsAdminEntry)" ng-model="row.entity.IsAdminEntry">'
                
            }*/
            /*,{
                field: 'fileOD',
                displayName: 'Action',
                enableColumnMenu: false,
                cellTemplate: '<button class="btn btn-primary" style="width: 96%;height: 96%;margin: 1%;" ng-click="grid.appScope.openModal(row.entity.Id)" ng-disabled="!grid.appScope.enableDisableLink(row.entity.ODStatus)">File OD</button>'
            }*/
        ]
        };
    }



    /*<button class="btn btn-primary" ng-click="grid.appScope.openModal(row.entity.Id)" ng-disabled="!grid.appScope.enableDisableLink(row.entity.ODStatus)">File OD</button>*/
    /*<a ng-click="grid.appScope.openModal(row.entity.Id)" ng-show="grid.appScope.enableDisableLink(row.entity.ODStatus)" href="">File OD</a>*/

    $scope.getAbsentData = function (empData) {
        // alert(empData.EmpId);
        leaveFctry.getAbsents(empData).then(function (response) {
            console.log(response.data);
            if (response.data != null) {
                $scope.absentGridOptions.data = response.data;
            }
        });
    }

    $scope.fileOD = function (OdData) {
        leaveFctry.fileOD(OdData).then(function (response) {
            //console.log('OD Data: ');
            //console.log(response.data);
            if (response.data == "OD Updated") {
                $scope.getAbsentData($rootScope.userDetails);
            }
        });
    }

    $scope.openModal = function (rowId) {
        var modalInstance = $modal.open({
            templateUrl: '/app/leaves/leaveFileODMdlCtrl.html',
            controller: 'leaveFileODMdlCtrl',
            size: 'md',
            resolve: {
                aValue: function () {
                    return rowId;
                }
            }
        });
        modalInstance.result.then(function (paramFromDialog) {
            $scope.paramFromDialog = paramFromDialog;
            $scope.getAbsentData($rootScope.userDetails);
        });
    }

    $scope.enableDisableLink = function (odStatus) {
        if (odStatus == "Not Filed")
            return true
        else
            return false;
    }

    $scope.init();
}]);