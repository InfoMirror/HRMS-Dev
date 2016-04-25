hrBaseApp.directive('hrHeaderDrctv', [
    '$state', '$log', 'localStorageService',
    function ($state, $log, localStorageService) {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-header-drctv.html';

        p.link = function ($scope, element, attributes, controller, $state, $rootScope) {


            $scope.logout = function () {
                $scope.logout1();
            }
            debugger;
            if (localStorageService.get('userDetails') != null) {
                $scope.activeUserName = localStorageService.get('userDetails').FirstName.value + ' ' + localStorageService.get('userDetails').LastName.value;
                alert($scope.activeUserName);
            }
        }

        p.controller = function ($scope, $rootScope, $state) {
            $scope.logout1 = function () {

                //   alert('1');
                gapi.auth.signOut();
                $rootScope.isLoggedIn = false;
                $rootScope.userDetails = [];
                $state.go('account');
            }


        }

        return p;
    }
])