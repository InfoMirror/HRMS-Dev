hrBaseApp.controller('hrmsEditProfileCtrl', ['$scope', '$rootScope', 'profileFctry', '$state', '$timeout', function ($scope, $rootScope, profileFctry, $state, $timeout) {
    'use strict';

    $scope.init = function () {
//$scope.Warningmsg=false;
        if ($rootScope.passedUserEmail == undefined) {
            $scope.getEmpData($rootScope.userDetails.UserEmail);
        } else {
            $scope.getEmpData($rootScope.passedUserEmail);
        }

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

    $scope.getEmpData = function (userEmail) {
        profileFctry.getEmpDetails({
            UserEmail: userEmail
        }).then(function (response) {
            $scope.formData = response.data[0];
            console.log($scope.formData);
        });
    }

    $scope.submit = function () {

        if ($scope.formData.Children1 == '' || $scope.formData.Children1 == undefined)
            $scope.formData.Children1 = null;
        if ($scope.formData.Children2 == '' || $scope.formData.Children1 == undefined)
            $scope.formData.Children1 = null;
        if ($scope.formData.DOJ == '' || $scope.formData.DOJ == undefined)
            $scope.formData.DOJ == null;
        if ($scope.formData.BankAccountNumber == '' || $scope.formData.BankAccountNumber == undefined)
            $scope.formData.BankAccountNumber == null;
        if ($scope.formData.ReportingHead == '' || $scope.formData.ReportingHead == undefined)
            $scope.formData.ReportingHead == null;
        if ($scope.formData.PFNo == '' || $scope.formData.PFNo == undefined)
            $scope.formData.PFNo == null;
        if ($scope.formData.UAN == '' || $scope.formData.UAN == undefined)
            $scope.formData.UAN == null;

        //Profile Status as per to the Role
        if ($rootScope.Role == 'HR') {
            $scope.formData.ProfileStatus = 24
        } else if ($rootScope.Role == 'Employee') {
            $scope.formData.ProfileStatus = 23
        }

        profileFctry.updateEmpDetails($scope.formData).then(function (response) {
          //  console.log(response.data);
           // alert($scope.formData.ProfileStatus);
            $rootScope.passedUserEmail = undefined;
            if($scope.formData.ProfileStatus==23 ||$scope.formData.ProfileStatus==22 ){
                alert("Your Profile is subbmited and awaited for approval");
                $scope.Warningmsg=true;
                $state.go('home.editProfile');
            }
            else{
                alert(0);
                $state.go('home.dashboard');
            }
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
            console.log($scope.reportingHeads);
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