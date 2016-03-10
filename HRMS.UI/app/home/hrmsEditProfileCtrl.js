hrBaseApp.controller('hrmsEditProfileCtrl', ['$scope', '$rootScope', 'profileFctry', '$state', function ($scope, $rootScope, profileFctry, $state) {
    'use strict';

    $scope.init = function () {
        $scope.formData = {};
        if ($rootScope.userDetails != undefined) {
            $scope.formData = $rootScope.userDetails;
            console.log($scope.formData);
        }
        /*$scope.formData = {
            Id: $rootScope.userDetails.Id,
            userEmail: $rootScope.userDetails.UserEmail
        };*/

        $scope.getReportingHeads();

        $scope.getGenders({
            MasterTypeId: 2
        });
        $scope.getDesignations({
            MasterTypeId: 1
        });
        $scope.getMaritalStatus({
            MasterTypeId: 3
        });
        $scope.getRelations({
            MasterTypeId: 4
        });
    }

    $scope.submit = function () {
        //alert(JSON.stringify($scope.formData));
        if ($rootScope.Role = 'HR') {
            $scope.formData.ProfileStatus = 24
        } else if ($rootScope.Role = 'Employee') {
            $scope.formData.ProfileStatus = 23
        }
        profileFctry.updateEmpDetails($scope.formData).then(function (response) {
            console.log(response.data);
            $state.go('home.dashboard');
        });
    }

    $scope.getRelations = function (MasterTypeId) {
        profileFctry.getMasterValue(MasterTypeId).then(function (response) {
            $scope.relations = response.data;
        });
    }

    $scope.getGenders = function (MasterTypeId) {
        profileFctry.getMasterValue(MasterTypeId).then(function (response) {
            $scope.genders = response.data;
        });
    }

    $scope.getDesignations = function (MasterTypeId) {
        profileFctry.getMasterValue(MasterTypeId).then(function (response) {
            $scope.designations = response.data;
        });
    }

    $scope.getMaritalStatus = function (MasterTypeId) {
        profileFctry.getMasterValue(MasterTypeId).then(function (response) {
            $scope.maritalStatus = response.data;
        });
    }

    $scope.getReportingHeads = function () {
        profileFctry.getAllEmployees().then(function (response) {
            $scope.reportingHeads = response.data;
        });
    }

    $scope.checkRole = function () {
        if ($rootScope.Role == 'HR')
            return true;
        else
            return false;
    }

    $scope.init();

}]);