hrBaseApp.controller('showEmpAbsentsHRCtrl', ['$scope', '$state', '$rootScope', 'profileFctry', function ($scope, $state, $rootScope, profileFctry) {
    'use strict';

    $scope.init = function () {
        /*        $scope.formData = {};*/
        $scope.getEmployees();
    }
  
    $scope.ApproveProfileGridOptions = {     
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
                displayName: 'Show Absent',
                enableColumnMenu: true,
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
            $state.go('home.editProfile');
        }

    }
    $scope.init();

}]);