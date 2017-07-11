hrBaseApp.controller('addEditEmpId', [
    '$scope', '$modalInstance', 'aValue', '$rootScope', '$state', 'profileFctry',
    function ($scope, $modalInstance, aValue, $rootScope, $state, profileFctry) {
        'use strict';

        $scope.init = function () {
            $scope.getEmpData($rootScope.passedUserEmail);
            $scope.editEmpId = {
                UserEmail: aValue,
                EmpId: EmpId
            }
        }

        $scope.submit = function () {
            //alert(JSON.stringify($scope.editEmpId));
            profileFctry.updateEmpId($scope.editEmpId).then(function (response) {              
                        $rootScope.userDetails.EmpId = $scope.editEmpId.EmpId;
                        alert("Employee Id Updated Successfully!"); 
            });
            $scope.close(true);
        }

        $scope.close = function (status) {
            $modalInstance.close(false);
        }
        $scope.getEmpData = function (userEmail) {
            profileFctry.getEmpDetails({
                UserEmail: $rootScope.passedUserEmail
            }).then(function (response) {
                $scope.formData = response.data[0];
                var EmpId = $scope.formData.EmpId.value;

            });
        }
        $scope.init();
    }
]);