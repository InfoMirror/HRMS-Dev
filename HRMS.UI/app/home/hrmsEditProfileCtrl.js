hrBaseApp.controller('hrmsEditProfileCtrl', ['$scope', '$rootScope', 'profileFctry', '$state', '$timeout', function ($scope, $rootScope, profileFctry, $state, $timeout) {
    'use strict';

    $scope.init = function () {
        //$scope.Warningmsg=false;
        if ($rootScope.passedUserEmail == undefined) {
            $scope.getEmpData($rootScope.userDetails.UserEmail.value);
        } else {
            $scope.getEmpData($rootScope.passedUserEmail);
        }

        $scope.IsVisible = $rootScope.userDetails.ownVisa.value;

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
            if ($rootScope.Role == 'HR' && $rootScope.userDetails.ProfileStatus.value != 24) {
                $rootScope.message = 'Please enter your profile data to see the Employee content.';
                return true;
            } else {
                if ($rootScope.userDetails.ProfileStatus.value == 22) {
                    $rootScope.message = 'Please enter your profile data and submit. After approval from HR you will be able to enter the portal.';
                    return true;
                } else if ($rootScope.userDetails.ProfileStatus.value == 23) {
                    $rootScope.message = 'Your profile data have been submitted. Please wait for the HR approval.';
                    return true;
                }
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
            $scope.IsVisible = $scope.formData.ownVisa.value;
            $scope.formData.visaCountry = null;
            $scope.formData.visaExpiryDate = null;
        }
    }

    $scope.submit = function () {

        if ($scope.formData.Children1.value == '' || $scope.formData.Children1.value == undefined)
            $scope.formData.Children1.value = null;
        if ($scope.formData.Children2.value == '' || $scope.formData.Children1.value == undefined)
            $scope.formData.Children1.value = null;
        if ($scope.formData.DOJ.value == '' || $scope.formData.DOJ.value == undefined)
            $scope.formData.DOJ.value == null;
        if ($scope.formData.BankAccountNumber.value == '' || $scope.formData.BankAccountNumber.value == undefined)
            $scope.formData.BankAccountNumber.value == null;
        if ($scope.formData.ReportingHead.value == '' || $scope.formData.ReportingHead.value == undefined)
            $scope.formData.ReportingHead.value == null;
        if ($scope.formData.PFNo.value == '' || $scope.formData.PFNo.value == undefined)
            $scope.formData.PFNo.value == null;
        if ($scope.formData.UAN.value == '' || $scope.formData.UAN.value == undefined)
            $scope.formData.UAN.value == null;
        if ($scope.formData.visaExpiryDate.value == '' || $scope.formData.visaExpiryDate.value == undefined)
            $scope.formData.visaExpiryDate.value == null;

        //Profile Status as per to the Role
        if ($rootScope.Role == 'HR') {
            $scope.formData.ProfileStatus.value = 24;
            $scope.formData.Role.value = "HR";
        } else if ($rootScope.Role == 'Employee') {
            $scope.formData.Role.value = "Employee";
            if ($scope.formData.ProfileStatus.value == 24 || $rootScope.Role == 'HR') {
                $scope.formData.ProfileStatus.value == 24;
            } else if ($scope.formData.ProfileStatus.value == 22 || $scope.formData.ProfileStatus.value == 23) {
                $scope.formData.ProfileStatus.value = 23;
                $rootScope.message = 'Your profile data changes have been submitted. Please wait for the HR approval.';
            }
        }

        profileFctry.updateEmpDetails($scope.formData).then(function (response) {
            if (response.data == 'Profile Updated') {
                $scope.getEmpData($rootScope.userDetails.UserEmail);
                /*alert('Your profile has been updated successfully.');
                if($rootScope.Role=='HR'){
                    $state.go('home.dashboard')
                }*/
            }
            $rootScope.passedUserEmail = undefined;
            if ($scope.formData.ProfileStatus.value == 23 || $scope.formData.ProfileStatus.value == 22) {
                alert("Your Profile has been subbmited. Please wait for the approval.");
                //$scope.Warningmsg=true;
                // $state.go('home.editProfile');
            } else if ($rootScope.Role == 'HR') {
                alert("Profile has been updated successfully");
                $rootScope.ShowAllStates = true;
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