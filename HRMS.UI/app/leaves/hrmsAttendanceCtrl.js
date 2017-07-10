hrBaseApp.controller('hrmsAttendanceCtrl', ['$scope', 'profileFctry', '$rootScope', function ($scope, profileFctry, $rootScope) {
    'use strict';

    $scope.init = function () {    
        $scope.EmpId  = $rootScope.userDetails.EmpId.value;   
        $scope.getReportingHeads();
    }
    $scope.getReportingHeads = function () {   
        
        profileFctry.getReportingHeadByEmpId({EmpId:$scope.EmpId}).then(function (response) {
            $scope.reportingHeads = response.data;
             $scope.reportingHeadName = $scope.reportingHeads[0].ReportingHead.value;
        });
    }
    $scope.init(); 

}]);