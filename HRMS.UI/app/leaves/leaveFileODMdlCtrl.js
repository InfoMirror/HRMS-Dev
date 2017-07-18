hrBaseApp.controller('leaveFileODMdlCtrl', [
    '$scope', '$modalInstance', 'aValue', 'leaveFctry','toastr',
    function ($scope, $modalInstance, aValue, leaveFctry, toastr) {
        'use strict';

        $scope.init = function () {
           $scope.disableSubmit = false;
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
            $scope.disableSubmit = true;
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
                     toastr.success("OD Filed");
                   $scope.getAbsentData($rootScope.userDetails);
                }
            });
        }

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
    }
]);