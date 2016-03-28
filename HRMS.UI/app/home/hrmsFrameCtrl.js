hrBaseApp.controller('hrmsFrameCtrl', [
  '$scope', '$stateParams', '$rootScope', 'localStorageService', '$state',
    function ($scope, $stateParams, $rootScope, localStorageService, $state) {
        'use strict';
        //alert('Hello, I am in Frame Controller');
        //$rootScope.User = $stateParams.User;
        //$rootScope.OEM = $stateParams.oemName;
        //console.log($rootScope.User);

        $rootScope.userDetails = localStorageService.get('userDetails');
        if ($rootScope.userDetails == null) {
            $state.go('home.account');
        } else {
            $rootScope.isLoggedIn = $rootScope.userDetails.isLoggedIn;
            if ($rootScope.userDetails.ProfileStatus == 22 || $rootScope.userDetails.ProfileStatus == 23) {
                $rootScope.ShowAllStates = false;
            } else if ($rootScope.userDetails.ProfileStatus == 24) {
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