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
                field: 'Value',
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
            /* $scope.employeeDetails = response.data;
             alert(JSON.stringify($scope.employeeDetails));*/
            $scope.ApproveProfileGridOptions.data = response.data;

        });
        $scope.getEmployeeDetails = function (rowId) {
            /*alert(rowId);
            $scope.$parent.$broadcast('passingRowId', { message: rowId });
            alert('Going to Profile State');*/
            $rootScope.passedUserEmail = rowId;
            $state.go('home.editProfile');
        }

    }
    $scope.init();

}]);