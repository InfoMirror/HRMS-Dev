hrBaseApp.controller('hrmsUserDeactivation', ['$scope', '$state', '$rootScope', 'profileFctry', 'toastr','localStorageService',
function ($scope, $state, $rootScope, profileFctry, toastr,localStorageService) {
    'use strict';

    $scope.init = function () {
        /*        $scope.formData = {};*/
        $scope.getDeactivatedEmployees();
    }
   
       $scope.UserDeactivateGridOptions = {   
   
		enableFiltering: true,
        columnDefs: [
          /*  {
                field: 'Name',
                displayName: 'Name'
            },*/
			
            {
                field: 'UserEmail.value',
                displayName: 'Email Id',
                headerCellClass: 'text-center'
          },
            {
                field: 'Team.value',
                displayName: 'Team',
                headerCellClass: 'text-center',
                cellClass: 'text-center'
          },
            
            {
                field: 'StatusType.value',
                displayName: 'Show Employee Details',
                enableColumnMenu: false,
                enableFiltering: false,
                  enableSorting: false,
                headerCellClass: 'text-center',
                cellTemplate: '<div>{{row.entity.Action}}<a ng-click="grid.appScope.getEmployeeDetails(row.entity.UserEmail.value)" style="margin-left: 30%;" href="">Show Details</a></div>'

            },

            {
                field: 'Action',
                displayName: 'Activate Employee',
                enableColumnMenu: false,
                enableFiltering: false,
                  enableSorting: false,
                headerCellClass: 'text-center',
                 cellClass: 'text-center',
                cellTemplate: '<div><label>Activate Again</label><input ng-model="row.entity.IsActive.value" type="checkbox" ng-click="grid.appScope.updateStatus(row.entity.IsActive.value,row.entity.EmpId.value)"/></div>'

            }
  
        ]
    };
    
    
    $scope.getDeactivatedEmployees = function(){
        profileFctry.getDeactivatedEmployees().then(function(response){
             $scope.UserDeactivateGridOptions.data = response.data;
        },
        function(response) {
            $scope.message = "Error in populating employee details.";
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

    /*$scope.updateStatus = function (IsActive, rowId) {
       
        profileFctry.updateEmployeeIsActive({
            UserEmail: rowId,
            IsActive: IsActive
        }).then(function (response) {       
         $scope.getDeactivatedEmployees();       
         
         });       
    }*/
    
    $scope.updateStatus = function (status, rowId) {
       profileFctry.updateEmployeeIsActive({
            EmpId: rowId,
            IsActive: status
        }).then(function (response) {
             toastr.success("Profile has been reactivated successfully.")
                $scope.getDeactivatedEmployees();       
        });
    }
    
    $scope.init();

}]);