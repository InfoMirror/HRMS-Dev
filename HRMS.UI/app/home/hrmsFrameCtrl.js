hrBaseApp.controller('hrmsFrameCtrl', [
  '$scope', '$stateParams', '$rootScope', 'localStorageService', '$state',
    function ($scope, $stateParams, $rootScope, localStorageService, $state) {
        'use strict';
        //alert('Hello, I am in Frame Controller');
        //$rootScope.User = $stateParams.User;
        //$rootScope.OEM = $stateParams.oemName;

        $rootScope.userDetails = localStorageService.get('userDetails');
        $rootScope.Role = localStorageService.get('role');
        if ($rootScope.userDetails == null) {
            $state.go('account');
        } else {
            $rootScope.isLoggedIn = $rootScope.userDetails.isLoggedIn;
            /*if ($rootScope.userDetails.Role.value == 'Employee' && ($rootScope.userDetails.ProfileStatus.value == 22 || $rootScope.userDetails.ProfileStatus.value == 23)) {
                $rootScope.ShowAllStates = false;
            } else if ($rootScope.userDetails.ProfileStatus.value == 24 || $rootScope.userDetails.Role.value == 'HR') {
                $rootScope.ShowAllStates = true;
            }*/
            if ($rootScope.userDetails.ProfileStatus.value == 22 || $rootScope.userDetails.ProfileStatus.value == 23) {
                $rootScope.ShowAllStates = false;
            } else if ($rootScope.userDetails.ProfileStatus.value == 24) {
                $rootScope.ShowAllStates = true;
            }
        }


        $scope.CanShowAllStates = function () {
            if ($rootScope.isLoggedIn && $rootScope.ShowAllStates) {
                return true;
            } else {
                return false;
            }
        }
  }
]);