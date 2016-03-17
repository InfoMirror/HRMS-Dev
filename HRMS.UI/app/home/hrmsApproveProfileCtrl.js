hrBaseApp.controller('hrmsApproveProfileCtrl', ['$scope', '$state', '$rootScope', 'profileFctry', function ($scope, $state, $rootScope, profileFctry) {
    'use strict';

    $scope.init = function () {
        /*        $scope.formData = {};*/
        $scope.getEmployees();
    }


    $scope.ApproveProfileGridOptions = {
        columnDefs: [
            {
                field: 'Name',
                displayName: 'Name'
            },
            {
                field: 'UserEmail',
                displayName: 'Email Id'
          },
            {
                field: 'Team',
                displayName: 'Team'
          },
            {
                field: 'Designation',
                displayName: 'Designation'
          },
            {
                field: 'Action',
                displayName: 'Show Details',
                enableColumnMenu: true,
                cellTemplate: '<div>{{row.entity.Action}}<button type="button"  ng-click="grid.appScope.getEmployeeDetails(row.entity.UserEmail)">Show Details</button></div>'
            }

        ]
    };

    $scope.getEmployees = function () {
        profileFctry.getApprovalReqEmp({
            Id: $rootScope.userDetails.Id
        }).then(function (response) {
            $scope.ApproveProfileGridOptions.data = response.data;

        });
        $scope.getEmployeeDetails = function (rowId) {
            $rootScope.passedUserEmail = rowId;
            $state.go('home.editProfile');
        }

    }
    $scope.init();

}]);