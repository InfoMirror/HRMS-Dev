hrBaseApp.controller('hrmsUserDeactivation', ['$scope', '$state', '$rootScope', 'profileFctry', function ($scope, $state, $rootScope, profileFctry) {
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
                displayName: 'Email Id'
          },
            {
                field: 'Team.value',
                displayName: 'Team'
          },

            {
                field: 'Action',
                displayName: 'Activate Employee',
                enableColumnMenu: false,
                cellTemplate: '<div><label>Activate Again</label><input ng-model="row.entity.IsActive.value" type="checkbox" ng-click="grid.appScope.updateStatus(row.entity.IsActive.value,row.entity.EmpId.value)"/></div>'

            }
  
        ]
    };
    
    
    $scope.getDeactivatedEmployees = function(){
        profileFctry.getDeactivatedEmployees().then(function(response){
            console.log(response.data);
             $scope.UserDeactivateGridOptions.data = response.data;
        },
        function(response) {
            $scope.message = "Error in populating employee details.";
        });
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
        console.log(status,rowId);        
  
       profileFctry.updateEmployeeIsActive({
            EmpId: rowId,
            IsActive: status
        }).then(function (response) {
            alert("Activated Employee Details.")
                $scope.getDeactivatedEmployees();       
        });
    }
    
    $scope.init();

}]);