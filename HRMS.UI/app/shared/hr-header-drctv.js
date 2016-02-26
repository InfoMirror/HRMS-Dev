hrBaseApp.directive('hrHeaderDrctv', [
    '$state', '$log',
    function ($state, $log) {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-header-drctv.html';

        p.link = function ($scope, element, attributes, controller, $state,$rootScope) {
            
            
            $scope.logout = function () {
                $scope.logout1();
            }
        }
        
        p.controller=function($scope,$rootScope,$state){
         $scope.logout1 = function () {
             
              alert('1');
                gapi.auth.signOut();
                  $rootScope.isLoggedIn = false;
             $rootScope.userDetails=[];
                 $state.go('home.account');
            }
           
            
        }

        return p;
    }
])