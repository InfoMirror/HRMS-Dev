hrBaseApp.controller('applyCompOffMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry',
    function ($scope, $modalInstance, aValue, leaveFctry) {
        'use strict';

        $scope.init = function () {
            $scope.CompOffData = {
                Id: aValue,
                CompOffReason: ''
            }
        }

        $scope.submit = function () {
            $scope.CompOffData.CompOffReason = $scope.CompOffReason;

            if ($scope.CompOffData.CompOffReason != '' && $scope.CompOffData.CompOffReason != undefined) {
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