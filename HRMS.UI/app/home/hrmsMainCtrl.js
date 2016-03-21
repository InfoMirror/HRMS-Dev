hrBaseApp.controller('hrmsMainCtrl', [
  '$scope', '$rootScope', 'dashboardFctry', '$state',
    function ($scope, $rootScope, dashboardFctry, $state) {
        'use strict';
        //  $rootScope.mywindow = $window;
        /*alert('Hello, I am in HRMS Main Controller');*/
        //#region === Initialize ===
        //#endregion

        $scope.init = function () {
            $scope.getProfileData();
            $scope.getBirthdayData();
            $scope.getAnniversaryData();
            $scope.getHolidayData();
        }

        $scope.profileGridOptions = {
            columnDefs: [
                {
                    field: 'Name',
                    displayName: 'Name'
                }
                , {
                    field: 'Gender',
                    displayName: 'Gender'
                }
                , {
                    field: 'Designation',
                    displayName: 'Designation'
                }
                , {
                    field: 'ReportingHead',
                    displayName: 'Reporting Head'
                }
            ]
        }

        $scope.holidaysGridOptions = {
            columnDefs: [
                {
                    field: 'FestivalName',
                    displayName: 'Name'
                },
                {
                    field: 'FestivalDate',
                    displayName: 'Festival',
                    cellFilter: 'date:\'dd-MMM-yyyy\''
                }
            ]
        }

        $scope.birthdaysGridOptions = {
            columnDefs: [
                {
                    field: 'Name',
                    displayName: 'Name'
                },
                {
                    field: 'DOB',
                    displayName: 'Birthday',
                    cellFilter: 'date:\'dd-MMM-yyyy\''
                }
            ]
        }


        $scope.AnniversaryGridOptions = {
            columnDefs: [
                {
                    field: 'Name',
                    displayName: 'Name'
                },
                {
                    field: 'DOJ',
                    displayName: 'Anniversary',
                    cellFilter: 'date:\'dd-MMM-yyyy\''
                }
            ]
        }

        $scope.getBirthdayData = function () {
            dashboardFctry.getBirthdays().then(function (response) {
                $scope.birthdaysGridOptions.data = response.data;
            });
        }

        $scope.getAnniversaryData = function () {
            dashboardFctry.getAnniversary().then(function (response) {
                $scope.AnniversaryGridOptions.data = response.data;
            });
        }

        $scope.getHolidayData = function () {
            dashboardFctry.getHolidays().then(function (response) {
                console.log(response.data);
                $scope.holidaysGridOptions.data = response.data;
            });
        }

        $scope.getProfileData = function () {

            dashboardFctry.getEmpProfileData({
                UserEmail: $rootScope.userDetails.UserEmail
            }).then(function (response) {
                $scope.profileData = response.data[0];
                console.log($scope.profileData);
            });
            /*if ($rootScope.userDetails != undefined) {
                var _gender;
                if ($rootScope.userDetails.Gender == 4) {
                    _gender: 'Female'
                } else if ($rootScope.userDetails.Gender == 3) {
                    _gender: 'Male'
                }
                $scope.profileData = {
                    Name: $rootScope.userDetails.FirstName + ' ' + $rootScope.userDetails.LastName,
                    Gender: _gender,
                    ReportingHead: $rootScope.userDetails.ReportingHead,
                    Designation: $rootScope.userDetails.Designation,
                    Team: $rootScope.userDetails.Team,
                    BloodGroup: $rootScope.userDetails.BloodGroup,
                    Email: $rootScope.userDetails.UserEmail,
                    EmpId: $rootScope.userDetails.EmpId,
                    CurrentAddress: $rootScope.userDetails.CurrentAddress,
                    ContactNo: $rootScope.userDetails.ContactNo,
                    SkypeID: $rootScope.userDetails.SkypeID,
                    DOJ: $rootScope.userDetails.DOJ,
                    DOB: $rootScope.userDetails.DOB
                }
            }*/

        }

        $scope.init();
}]);