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
          //  $scope.getHolidayData();
            $scope.getHolidayCalendar();
        }     


        $scope.getBirthdayData = function () {
            dashboardFctry.getBirthdays().then(function (response) {
                if (response.data.length <= 0) {
                   $scope.noBirthday = true;
                }
                else {
                    $scope.getBirthdays = response.data;
                    console.log("birthdays", $scope.getBirthdays)
                }
            });
        }

        $scope.getAnniversaryData = function () {
            dashboardFctry.getAnniversary().then(function (response) {
                if (response.data.length <= 0) {
                    $scope.noAnniversary = true;
                }
                else {
                    $scope.getAnniversaries = response.data;
                    console.log("birthdays", $scope.getAnniversaries)
                }
            });
        }

        $scope.getHolidayCalendar = function () {
            dashboardFctry.getHolidays().then(function (response) {
                // console.log(response.data);
                // $scope.holidayCalendarGridOptions.data = response.data;
                $scope.holidayCalendar = response.data;
            });
        }

        /* $scope.showCalendarData = function () {
             $scope.ShowCalendar = true;
         }*/

        $scope.getProfileData = function () {
            if ($rootScope.userDetails != undefined) {
                $scope.profileData = {
                    Name: $rootScope.userDetails.FirstName + ' ' + $rootScope.userDetails.LastName,
                    Gender: $rootScope.userDetails.Gender,
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
            }

        }

        $scope.init();
    }
]);