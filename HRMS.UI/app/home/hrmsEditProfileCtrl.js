hrBaseApp.controller('hrmsEditProfileCtrl', ['$window', '$scope', '$rootScope', 'profileFctry', '$state', '$timeout', 'toastr', '$modal', 'localStorageService',
    function ($window, $scope, $rootScope, profileFctry, $state, $timeout, toastr, $modal, localStorageService) {
        'use strict';
        $scope.validName = /^[a-zA-Z\s.]+$/;
        $scope.Issubmitted = false;
        $scope.init = function () {
            $scope.emailpattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
            $scope.validAlphaOnly = /^[A-z]+$/;
            $scope.validBloodGroup = /^(A|B|AB|O)[+-]?$/;
            $scope.skypeUserName = "^[a-z0-9_-]{3,15}$";
            $scope.validAlphaNum = /^[a-zA-Z0-9]+$/;
            $scope.onlyNumbers = /^\d+$/;
            var isSelf = localStorageService.get('isSelf');
            var passedUserEmail = localStorageService.get('passedUserEmail');

            if (isSelf === "true") {
                $scope.getEmpData($rootScope.userDetails.UserEmail.value);
            }
            if (isSelf === "false") {
                $scope.getEmpData(passedUserEmail);
            }
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
        }

        $scope.afterInit = function () {
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
            if (angular.isUndefined($scope.formData.visaCountry.value) && $scope.formData.ownVisa.value == true) {
                $scope.formData.visaCountry.value = "USA";
            }

            //    if (angular.isUndefined($scope.formData.visaExpiryDate.value) && $scope.formData.ownVisa.value == true) {
            //         $scope.formData.visaCountry.value = "USA";
            //     }  

        }
        $scope.startMin = new Date();

        $scope.dobValidate = function () {
            $scope.formData.DOB.value = document.getElementById("DOB").children[0].value;
            $scope.today = new Date();
            $scope.nowyear = $scope.today.getFullYear();
            $scope.nowmonth = $scope.today.getMonth();
            $scope.nowday = $scope.today.getDate();
            $scope.DOB = new Date($scope.formData.DOB.value)
            $scope.birthyear = $scope.DOB.getFullYear();
            $scope.birthmonth = $scope.DOB.getMonth();
            $scope.birthday = $scope.DOB.getDate();
            $scope.age = $scope.nowyear - $scope.birthyear;
            $scope.age_month = $scope.nowmonth - $scope.birthmonth;
            $scope.age_day = $scope.nowday - $scope.birthday;


            if ($scope.age > 100) {
                alert("Age cannot be more than 100 Years.Please enter correct age")
                return false;
            }
            if ($scope.age_month < 0 || ($scope.age_month == 0 && $scope.age_day < 0)) {
                $scope.age = parseInt($scope.age) - 1;


            }
            if (($scope.age == 18 && $scope.age_month <= 0 && $scope.age_day <= 0) || $scope.age < 18) {
                alert("Age should be more than 18 years.Please enter a valid Date of Birth");
                return false;
            }
        }
        $scope.showMessage = function () {

            if ($scope.userDetails != null) {
                if ($rootScope.Role == 'HR' && $rootScope.userDetails.ProfileStatus.value != 24) {
                    //  alert($scope.userDetails.Role.value);
                    if ($scope.userDetails.Role.value == 'HR' && $scope.userDetails.ProfileStatus.value != 24) {
                        $rootScope.message = 'Please enter your profile data to see the Employee content.';
                        return true;
                    } else {
                        if ($scope.userDetails.ProfileStatus.value == 22) {
                            $rootScope.message = 'Please enter your profile data and submit. After approval from HR you will be able to enter the portal.';
                            return true;
                        }
                        if ($scope.userDetails.ProfileStatus.value == 23) {
                            $rootScope.message = 'Your profile data have been submitted. Please wait for the HR approval.';

                        }
                    }
                }
            }
        }

        $scope.onNextClick = function () {
            $scope.Issubmitted = true;

        }

        $scope.checkDOJ = function () {
            var currDate = new Date();
            $scope.formData.DOJ.value = document.getElementById("DOJ").children[0].value;
            $scope.formData.DOB.value = document.getElementById("DOB").children[0].value;
            var dateOfJoining = new Date($scope.formData.DOJ.value);
            var dateOfBirth = new Date($scope.formData.DOB.value);
            //Check for DOB<DOJ
            if ($scope.formData.DOB.value != null && $scope.formData.DOB.value != undefined) {
                if (dateOfJoining < dateOfBirth) {
                    toastr.warning("Date of Joining can not be less than Date of Birth");
                    $scope.formData.DOJ.value = new Date();
                }
            }
            //Check for DOJ<Current Date
            if (dateOfJoining > currDate) {
                toastr.warning("Date of Joining can not be a future date");
                $scope.formData.DOJ.value = new Date();
            }
        }

        $scope.endDateCalOpen = function ($event) {
            $scope.ToMin = $scope.formData.PassportIssueDate.value;
        }

        $scope.startDateCalOpen = function ($event) {
            if ($scope.formData.PassportIssueDate.value > new Date()) {
                toastr.warning("Issue Date can not be greater than today.");
                $scope.formData.PassportIssueDate.value = new Date();
            }
            if (($scope.formData.PassportExpiryDate.value != null && $scope.formData.PassportExpiryDate.value != undefined) && ($scope.formData.PassportIssueDate.value > $scope.formData.PassportExpiryDate.value)) {
                toastr.warning("Issue Date can not be greater than Expiry Date");
                $scope.formData.PassportExpiryDate.value = $scope.formData.PassportIssueDate.value;
            }
        }

        $scope.getEmpData = function (userEmail) {
            profileFctry.getEmpDetails({ UserEmail: userEmail }).then(function (response) {
                console.log("factory response", response)
                $scope.formData = response.data[0];
                $scope.formData.ModifiedBy.value = $rootScope.userDetails.UserEmail.value;
                $scope.employeeDesignation = $scope.formData.Designation.value;
                $scope.getDOB = $scope.formData.DOB.value;
                $scope.userDetails = $scope.formData;
                if ($scope.formData.Role.value == "HR") {
                    $scope.formData.hrAccess = true;
                } else {
                    $scope.formData.hrAccess = false;
                }

                $scope.afterInit();
            });
        }

        $scope.ShowHide = function () {
            //If DIV is visible it will be hidden and vice versa.
            if ($scope.formData != null && $scope.formData != undefined) {
                if ($scope.formData.ownVisa.value == 1) {
                    //$scope.IsVisaChecked = true;
                    return true;
                } else {
                    //$scope.IsVisaChecked = false;
                    $scope.formData.visaCountry.value = null;
                    $scope.formData.visaExpiryDate.value = null;
                    return false;
                }
            } else {
                if ($scope.userDetails.ownVisa.value == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        $scope.HidePassportDetails = function () {
            //If DIV is visible it will be hidden and vice versa.
            if ($scope.formData != null && $scope.formData != undefined) {
                if ($scope.formData.ownPassport.value == 1) {
                    // $scope.IsPassportChecked = true;
                    return true;
                } else {
                    // $scope.IsPassportChecked = false;
                    $scope.formData.PassportNumber.value = null;
                    $scope.formData.PassportIssueDate.value = null;
                    $scope.formData.PassportExpiryDate.value = null;
                    $scope.formData.PassportIssuePlace.value = null;
                    return false;
                }
            } else {
                if ($scope.userDetails.ownPassport.value == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        $scope.updateEmpId = function () {
            if ($scope.formData.EmpId.value !== null) {
                profileFctry.isEmpIdExist($scope.formData).then(function (response) {
                    $scope.editEmpId = {
                        UserEmail: $scope.formData.UserEmail.value,
                        EmpId: $scope.formData.EmpId
                    }
                    //alert(JSON.stringify(response));
                    if (response.data.length > 0) {
                        if (response.data[0].UserEmail.value != $scope.formData.UserEmail.value) {
                            toastr.warning('This Employee Unique Id already exist. Please change the Employee Unique Id and then update the profile');
                        } else {
                            profileFctry.updateEmpId($scope.editEmpId).then(function (response) {
                                $rootScope.userDetails.EmpId = $scope.editEmpId.EmpId;
                                toastr.success("Employee Id Updated Successfully!");
                            });
                        }
                    } else {
                        profileFctry.updateEmpId($scope.editEmpId).then(function (response) {
                            $rootScope.userDetails.EmpId = $scope.editEmpId.EmpId;
                            toastr.success("Employee Id Updated Successfully!");
                        });
                    }
                });
            } else {
                toastr.warning('please enter the employee Id')
            }
        }


        $scope.submit = function () {
            if ($rootScope.Role == 'HR') {
                profileFctry.isEmpIdExist($scope.formData).then(function (response) {
                    //alert(JSON.stringify(response));
                    if (response.data.length > 0) {
                        if (response.data[0].UserEmail.value != $scope.formData.UserEmail.value) {
                            toastr.warning('This Employee Unique Id already exist. Please change the Employee Unique Id and then update the profile');
                        } else {
                            $scope.updateEmpDetails();
                        }
                    } else {
                        $scope.updateEmpDetails();
                    }
                });
            } else {
                $scope.updateEmpDetails();
            }
        }

        $scope.updateEmpDetails = function () {
            if ($rootScope.Role != 'HR') {
                $scope.formData.DOJ.value = null;
                $scope.formData.BankAccountNumber.value = null;
                $scope.formData.ReportingHead.value = null;
                $scope.formData.PFNo.value = null;
                $scope.formData.UAN.value = null;
                $scope.formData.EmpId.value = null;
                $scope.formData.Team.value = null;
            }
            if ($scope.formData.Children1.value == '' || $scope.formData.Children1.value == undefined)
                $scope.formData.Children1.value = null;
            if ($scope.formData.Children2.value == '' || $scope.formData.Children1.value == undefined)
                $scope.formData.Children1.value = null;
            if ($scope.formData.DOJ.value == '' || $scope.formData.DOJ.value == undefined)
                $scope.formData.DOJ.value = null;
            if ($scope.formData.BankAccountNumber.value == '' || $scope.formData.BankAccountNumber.value == undefined)
                $scope.formData.BankAccountNumber.value = null;
            if ($scope.formData.ReportingHead.value == '' || $scope.formData.ReportingHead.value == undefined)
                $scope.formData.ReportingHead.value = null;
            if ($scope.formData.PFNo.value == '' || $scope.formData.PFNo.value == undefined)
                $scope.formData.PFNo.value = null;
            if ($scope.formData.UAN.value == '' || $scope.formData.UAN.value == undefined)
                $scope.formData.UAN.value = null;
            if ($scope.formData.visaCountry != null) {
                if ($scope.formData.visaCountry.value == '' || $scope.formData.visaCountry.value == undefined)
                    $scope.formData.visaCountry.value = null;
            } else {
                $scope.formData.visaCountry = {
                    value: null
                };
            }
            if ($scope.formData.visaExpiryDate != null) {
                if ($scope.formData.visaExpiryDate.value == '' || $scope.formData.visaExpiryDate.value == undefined)
                    $scope.formData.visaExpiryDate.value = null;
            } else {
                $scope.formData.visaExpiryDate = {
                    value: null
                };
            }
            if ($scope.formData.hrAccess) {
                $scope.formData.Role.value = "HR";
            } else {
                $scope.formData.Role.value = "Employee";
            }
            //Profile Status as per to the Role
            if ($rootScope.Role == 'HR') {
                $scope.formData.ProfileStatus.value = 24;
                //$scope.formData.Role.value = "HR";
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
                }
                if ($scope.formData.ProfileStatus.value == 23 || $scope.formData.ProfileStatus.value == 22) {
                    if ($rootScope.Role === 'HR' && $state.current.name === "home.editMyProfile") {
                        toastr.success("Profile has been updated successfully");
                        $window.location.reload();
                    } else {
                        toastr.success("Your Profile has been subbmited. Please wait for the approval.");
                    }
                } 
                if ($scope.formData.ProfileStatus.value === 24 && $state.current.name === "home.editProfile") {

                    toastr.success("Profile has been updated successfully");
                    $state.go('home.hr.approveProfile');
                }

                if ($scope.formData.ProfileStatus.value === 24 && $state.current.name === "home.editMyProfile") {

                    toastr.success("Profile has been updated successfully");
                    $state.go('home.dashboard');
                }
            });
        }

        $scope.getRelations = function (MasterTypeId) {
            profileFctry.getMasterValue(MasterTypeId).then(function (response) {
                $scope.relations = response.data;
                if (angular.isUndefined($scope.formData.RelationWithNominee.value)) {
                    $scope.formData.RelationWithNominee.value =
                        $scope.relations[0].Id.value;
                }
                if (angular.isUndefined($scope.formData.RelationWithEC.value)) {
                    $scope.formData.RelationWithEC.value =
                        $scope.relations[0].Id.value;
                }

            });
        }
        $scope.getGenders = function (MasterTypeId) {
            profileFctry.getMasterValue(MasterTypeId).then(function (response) {
                $scope.genders = response.data;
                if (angular.isUndefined($scope.formData.Gender.value)) {
                    $scope.formData.Gender.value = $scope.genders[0].Id.value;
                }
            });
        }


        $scope.getDesignations = function (MasterTypeId) {
            profileFctry.getMasterValue(MasterTypeId).then(function (response) {
                $scope.designations = response.data;
                if (angular.isUndefined($scope.employeeDesignation)) {
                    $scope.employeeDesignation = $scope.designations[0].Value.value;

                }
            });
        }
        $scope.getMaritalStatus = function (MasterTypeId) {
            profileFctry.getMasterValue(MasterTypeId).then(function (response) {
                $scope.maritalStatus = response.data;
                if (angular.isUndefined($scope.formData.MaritalStatus.value)) {
                    $scope.formData.MaritalStatus.value =
                        $scope.maritalStatus[0].Id.value;
                }
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

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/home/addEditEmpId.html',
                controller: 'addEditEmpId',
                size: 'md',
                resolve: {
                    aValue: function () {

                        return $rootScope.passedUserEmail

                    }
                }
            });
            modalInstance.result.then(function (paramFromDialog) {
                if (paramFromDialog) {
                    $scope.getEmpData($rootScope.passedUserEmail);
                };

            });
        }
        $scope.init();

    }]);