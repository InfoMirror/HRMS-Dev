hrBaseApp.controller('leaveFileODMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry',
    function ($scope, $modalInstance, aValue, leaveFctry) {
        'use strict';

        $scope.init = function () {
            // $scope.valuePassed = aValue;
            $scope.odData = {
                Id: {
                    value: aValue
                },
                ODReason: {
                    value: ''
                }
            }
        }

        $scope.submit = function () {
            $scope.odData.ODReason.value = $scope.odReason;

            if ($scope.odData.ODReason.value != '' && $scope.odData.ODReason.value != undefined) {
                $scope.fileOD($scope.odData);
            }

            $scope.close();
        }

        $scope.fileOD = function (OdData) {
            leaveFctry.fileOD(OdData).then(function (response) {
                //console.log('OD Data: ');
                //console.log(response.data);
                if (response.data == "OD Updated") {
                    // $scope.getAbsentData($rootScope.userDetails);
                }
            });
        }

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
    }
]);