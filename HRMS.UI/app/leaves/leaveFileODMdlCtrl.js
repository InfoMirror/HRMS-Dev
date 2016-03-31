hrBaseApp.controller('leaveFileODMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry', '$rootScope',
    function ($scope, $modalInstance, aValue, leaveFctry, $rootScope) {
        'use strict';

        $scope.init = function () {
            // $scope.valuePassed = aValue;
            $scope.odData = {
                Id: aValue,
                ODReason: ''
            }
        }

        $scope.submit = function () {
            $scope.odData.ODReason = $scope.odReason;

            if ($scope.odData.ODReason != '' && $scope.odData.ODReason != undefined) {
                $scope.fileOD($scope.odData);
            }

            $scope.close();
        }

        $scope.fileOD = function (OdData) {
            leaveFctry.fileOD(OdData).then(function (response) {
                $modalInstance.close();
            });
        }

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
    }
]);