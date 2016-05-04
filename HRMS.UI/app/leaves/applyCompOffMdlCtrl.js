hrBaseApp.controller('applyCompOffMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry', '$rootScope', '$state',
    function ($scope, $modalInstance, aValue, leaveFctry, $rootScope, $state) {
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
        $scope.startMin = moment().subtract(30, 'days').format('MM/DD/YYYY');
        //  alert($scope.startDateDisplay);
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.submit = function () {
            $scope.CompOffData.compOffReason = $scope.CompOffReason;

            if ($scope.CompOffData.compOffReason != '' && $scope.CompOffData.compOffReason != undefined) {
                $scope.CompOffData.CompOffDate = $scope.CompOffDate;
                $scope.CompOffData.compOffReason = $scope.CompOffReason;
                console.log($scope.CompOffData);
                $scope.insertCompOff($scope.CompOffData);
            }
        }

        $scope.insertCompOff = function (CompOffData) {
                leaveFctry.insertCompOff(CompOffData).then(function (response) {
                    //alert(response.data);
                    if (response.data == "CompOff Applied") {
                        alert('CompOff Is Applied');
                        //$state.go('home.attendance.compoffs');              
                        // $scope.getCompOffsData($rootScope.userDetails);
                        $modalInstance.close();
                    } else {
                        alert('CompOff Is Allready Exist');
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