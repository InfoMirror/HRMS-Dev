hrBaseApp.controller('hrmsEditProfileCtrl', ['$scope', '$rootScope', 'profileFctry', '$state', '$timeout', function ($scope, $rootScope, profileFctry, $state, $timeout) {
    'use strict';

    $scope.init = function () {
        //$scope.Warningmsg=false;
        if ($rootScope.passedUserEmail == undefined) {
            $scope.getEmpData($rootScope.userDetails.UserEmail.value);
        } else {
            $scope.getEmpData($rootScope.passedUserEmail);
        }

        $scope.IsVisible = $rootScope.userDetails.ownVisa;

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
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
    }

    $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

    $scope.showMessage = function () {
        if ($rootScope.userDetails != null) {
            if ($rootScope.userDetails.ProfileStatus == 22) {
                $rootScope.message = 'Please enter your profile data and submit. After approval from HR you will be able to enter the portal.';
                return true;
            } else if ($rootScope.userDetails.ProfileStatus == 23) {
                $rootScope.message = 'Your profile data have been submitted. Please wait for the HR approval.';
                return true;
            }
        }
    }

    $scope.getEmpData = function (userEmail) {
        profileFctry.getEmpDetails({
            UserEmail: userEmail
        }).then(function (response) {
            $scope.formData = response.data[0];
            $rootScope.userDetails = $scope.formData;
        });
    }

    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        if ($scope.formData.ownVisa == 1) {
            $scope.IsVisible = true;
        } else {
            $scope.IsVisible = $scope.formData.ownVisa;
            $scope.formData.visaCountry = null;
            $scope.formData.visaExpiryDate = null;
        }
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
        if ($scope.formData.visaExpiryDate == '' || $scope.formData.visaExpiryDate == undefined)
            $scope.formData.visaExpiryDate == null;

        //Profile Status as per to the Role
        if ($rootScope.Role == 'HR') {
            $scope.formData.ProfileStatus = 24
        } else if ($rootScope.Role == 'Employee') {
            if ($scope.formData.ProfileStatus == 24) {
                $scope.formData.ProfileStatus == 24;
            } else if ($scope.formData.ProfileStatus == 22 || $scope.formData.ProfileStatus == 23) {
                $scope.formData.ProfileStatus = 23;
                $rootScope.message = 'Your profile data changes have been submitted. Please wait for the HR approval.';
            }
        }

        profileFctry.updateEmpDetails($scope.formData).then(function (response) {
            if (response.data == 'Profile Updated') {
                $scope.getEmpData($rootScope.userDetails.UserEmail);
                alert('Your profile has been updated successfully.');
            }
            $rootScope.passedUserEmail = undefined;
            if ($scope.formData.ProfileStatus == 23 || $scope.formData.ProfileStatus == 22) {
                alert("Your Profile has been subbmited. Please wait for the approval.");
                //$scope.Warningmsg=true;
                // $state.go('home.editProfile');
            } else {
                //  $state.go('home.dashboard');
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