hrBaseApp.controller('hrmsApproveProfileCtrl', ['$scope', '$state', '$rootScope', 'profileFctry', 'localStorageService', function ($scope, $state, $rootScope, profileFctry, localStorageService) {
    'use strict';

    $scope.init = function () {
        /*        $scope.formData = {};*/
        $scope.getEmployees();
    }
    $scope.getBkgColorTable = function (row) {
        //return 'may';
        switch (row.entity.ProfileStatus) {
            case 22:  
                return 'rowRed';
                break;
            case 23:
                return 'rowawq';
                break;
            default: // anything but 0 and -1, alerts
                //  alert(24);
                return 'rowlime';
        }
    };
    //style="{\'background-color\': grid.appScope.getBkgColorTable()}" 

    // var rowtpl = '<div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'rowlime\':row.entity.ProfileStatus==24,\'rowawq\':row.entity.ProfileStatus==23,\'rowRed\':row.entity.ProfileStatus==22 }" ui-grid-cell></div></div>';

    //var rowTemplate = '<div style="height: 100%" ng-class="{rowRed: row.entity.ProfileStatus.value == 22, rowawq: row.entity.ProfileStatus.value == 24}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' + '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +

    var rowtpl = '<div><div ng-class="{rowRed: row.entity.ProfileStatus.value == 22, rowawq: row.entity.ProfileStatus.value == 24}" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';

    $scope.ApproveProfileGridOptions = {
        rowTemplate: rowtpl,
        enableFiltering: true,
        columnDefs: [
            /*  {
                  field: 'Name',
                  displayName: 'Name'
              },*/

            {
                field: 'UserEmail.value',
                displayName: 'Email Id'
            },
            {
                field: 'Team.value',
                displayName: 'Team'
            },

            {
                field: 'StatusType.value',
                displayName: 'Show Details',
                enableColumnMenu: false,
                enableFiltering: false,
                cellTemplate: '<div>{{row.entity.Action}}<a ng-click="grid.appScope.getEmployeeDetails(row.entity.UserEmail.value)" style="margin-left: 15%;" href="">Show Details</a></div>'

            }

        ]
    };

    $scope.getEmployees = function () {
        profileFctry.getApprovalReqEmp({
            Id: $rootScope.userDetails.Id
        }).then(function (response) {
            // alert(JSON.stringify(response.data));
            $scope.ApproveProfileGridOptions.data = response.data;
            //$scope.ApproveProfileGridOptions.sortBy('name');

        });
        $scope.getEmployeeDetails = function (rowId) {
            $rootScope.passedUserEmail = rowId;
            $rootScope.setisSelf = false;
            localStorageService.set('isSelf', undefined);
            localStorageService.set('isSelf', $rootScope.setisSelf);
             localStorageService.set('passedUserEmail',$rootScope.passedUserEmail);
            $state.go('home.editProfile');
        }
    }
    $scope.init();

}]);