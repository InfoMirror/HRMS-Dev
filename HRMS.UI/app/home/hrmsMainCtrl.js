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

        /*  $scope.profileGridOptions = {
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
          }*/

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
                },
                {
                    field: 'Action',
                    displayName: 'Show Calendar',
                    cellEditableCondition: false,
                    /*cellTemplate: '<div><a ng-show="ShowCalendar" ng-click="grid.appScope.showCalendarData()">Show Calendar</a></div>' */
                    cellTemplate: '<div><a href="" ng-click="grid.appScope.showCalendarData()">Show Calendar</a></div>'
                }
            ]
        }


        $scope.getBirthdayData = function () {
            dashboardFctry.getBirthdays().then(function (response) {
                //$scope.birthdaysGridOptions.data = response.data;
                 $scope.getBirthdays = response.data;
                 //console.log("hello",$scope.getBirthdays)
            });
        }

        $scope.getAnniversaryData = function () {
            dashboardFctry.getAnniversary().then(function (response) {
               // $scope.AnniversaryGridOptions.data = response.data;
                $scope.getAnniversaries = response.data;
            });
        }

        /*$scope.getHolidayData = function () {
            dashboardFctry.getHolidays().then(function (response) {
                // console.log(response.data);
                $scope.holidaysGridOptions.data = response.data;
            });
        }*/

        $scope.getHolidayCalendar = function () {
            dashboardFctry.getHolidayCalendar().then(function (response) {
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