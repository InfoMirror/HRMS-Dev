hrBaseApp.controller('applyCompOffMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry', '$rootScope',
    function ($scope, $modalInstance, aValue, leaveFctry, $rootScope) {
        'use strict';

        $scope.init = function () {

            $scope.CompOffData = {
                EmpId: aValue,
                CompOffDate: new Date(),
                startTime: null,
                endTime: null,
                compOffStatus: 16,
                isManual: 1,
                compOffReason: ''
            }
        }

        $scope.submit = function () {
            $scope.CompOffData.compOffReason = $scope.CompOffReason;

            if ($scope.CompOffData.compOffReason != '' && $scope.CompOffData.compOffReason != undefined) {
                $scope.CompOffData.CompOffDate = $scope.CompOffDate;
                $scope.CompOffData.compOffReason = $scope.CompOffReason;
                console.log($scope.CompOffData);
                $scope.insertCompOff($scope.CompOffData);
            }

            $scope.close();
        }

        $scope.insertCompOff = function (CompOffData) {
            leaveFctry.insertCompOff(CompOffData).then(function (response) {

                if (response.data == "CompOff Applied") {
                    $scope.insertCompOff($rootScope.userDetails);
                }
            });
        }

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
    }
]);