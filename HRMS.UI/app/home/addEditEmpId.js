hrBaseApp.controller('addEditEmpId', [
    '$scope', '$modalInstance', 'aValue', '$rootScope', '$state', 'profileFctry',
    function ($scope, $modalInstance, aValue, $rootScope, $state, profileFctry) {
        'use strict';

        $scope.init = function () {
            $scope.editEmpId = {
                UserEmail: aValue,
                EmpId: ''
            }
        }

        $scope.submit = function () {
            //alert(JSON.stringify($scope.editEmpId));
            profileFctry.updateEmpId($scope.editEmpId).then(function (response) {
                $rootScope.userDetails.EmpId = $scope.editEmpId.EmpId;
                alert("Employee Id Updated Successfully!");
            });
            $scope.close();
        }

        $scope.close = function () {
            $modalInstance.close();
        }

        $scope.init();
    }
]);