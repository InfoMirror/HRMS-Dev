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
            $scope.changeState1 = function () {
                $scope.changeState();
            }
            if (localStorageService.get('userDetails') != null) {
                $scope.activeUserName = localStorageService.get('userDetails').FirstName.value + ' ' + localStorageService.get('userDetails').LastName.value;
            }
        }

        p.controller = function ($scope, $rootScope, $state,localStorageService) {
            $scope.logout1 = function () {
                $rootScope.isLoggedIn = false;
                $rootScope.userDetails = [];
                localStorageService.set('userDetails', undefined);
                localStorageService.set('isLoggedIn', undefined);
                localStorageService.set('role', undefined);
                $state.go('account');
            }

            $scope.changeState = function () {
                if (localStorageService.get('userDetails').ProfileStatus.value == 24) {
                    $state.go('home.dashboard');
                } /*else {
                    $state.go('home.editprofile');
                }*/
            }

            $scope.setIsSelf = function(){
                $rootScope.setisSelf = true;
                localStorageService.set('isSelf', $rootScope.setisSelf);
                $state.go('home.editMyProfile');
            }

        }

        return p;
    }
])