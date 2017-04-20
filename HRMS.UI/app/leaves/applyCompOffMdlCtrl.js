hrBaseApp.controller('applyCompOffMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry', '$rootScope', '$state', 'dashboardFctry', '$filter',
    function ($scope, $modalInstance, aValue, leaveFctry, $rootScope, $state, dashboardFctry, $filter) {
        'use strict';

        $scope.init = function () {

                $scope.CompOffData = {
                    EmpId: aValue,
                    CompOffDate: new Date(),
                    startTime: null,
                    endTime: null,
                    CompOffStatus: 16,
                    isManual: 1,
                    compOffReason: ''
                }
            }
            /*$scope.startMin = moment().subtract(30, 'days').format('MM/DD/YYYY');*/
        $scope.startMin = moment().subtract(30, 'days').format('MM/DD/YYYY');
        //  alert($scope.startDateDisplay);
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.holiday = null;
        $scope.getHolidays = function () {
            $scope.comparingDate = {
                value: $scope.CompOffData.CompOffDate
            };
            dashboardFctry.getHolidayCalendar().then(function (response) {
                $scope.holidays = response.data;
                $scope.holiday = $filter("filter")($scope.holidays, {
                    FestivalDate: $scope.comparingDate
                });
            });
        }

        $scope.submit = function () {
            if ($scope.CompOffData.compOffReason != '' && $scope.CompOffData.compOffReason != undefined) {
                debugger;
                if (new Date($scope.CompOffData.CompOffDate).getDay() == 6 || new Date($scope.CompOffData.CompOffDate).getDay() == 0) {
                    $scope.insertCompOff($scope.CompOffData);
                } else {
                    debugger;
                    $scope.comparingDate = {
                        value: $scope.CompOffData.CompOffDate
                    };
                    dashboardFctry.getHolidayCalendar().then(function (response) {
                        $scope.holidays = response.data;
                        $scope.holiday = $filter("filter")($scope.holidays, {
                            FestivalDate: $scope.comparingDate
                        });
                        if ($scope.holiday == null || $scope.holiday == undefined || $scope.holiday.length == 0) {
                            alert('This was a working day, so you can not apply comp off for this. May be you should file OD for this.');
                            $modalInstance.close();
                        } else {
                            $scope.insertCompOff($scope.CompOffData);
                        }
                    });
                }
                //console.log($scope.CompOffData);
            }
        }

        $scope.resetResults = function () {
            var currDate = new Date();
            $scope.CompOffData.CompOffDate = document.getElementById("CompOffDate").children[0].value;
            var compOffDate = new Date($scope.CompOffData.CompOffDate);
            if (compOffDate > currDate) {
                alert("Comp Off can not be applied to the future dates.");
                $scope.CompOffData.CompOffDate = currDate;
            }
        }

        $scope.insertCompOff = function (CompOffData) {
                leaveFctry.insertCompOff(CompOffData).then(function (response) {
                    //alert(response.data);
                    if (response.data == "CompOff Applied") {
                        alert('CompOff Applied Successfully');
                        //$state.go('home.attendance.compoffs');              
                        // $scope.getCompOffsData($rootScope.userDetails);
                        $modalInstance.close();
                    } else {
                        alert('You have already applied for this comp off');
                        $modalInstance.close();
                    }
                });
            }
            /*$scope.open = function ($event) {
alert(0);

      }*/

        /*$scope.open1 = function ($event) {
   //   alert($scope.startDateDisplay);
$scope.startMin2 = $scope.startDateDisplay;

      }*/
        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
    }
]);