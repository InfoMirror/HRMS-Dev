hrBaseApp.directive('hrTopStatesDrctv', ['$state',
    function ($state) {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-top-states-drctv.html';

        p.scope = {
            parentState: '@parentState'
        };
        p.controller = function ($scope, $state) {

            $scope.filterStates = function () {

                $scope.states = $state.get().filter(function (x) {

                    if ((x.name.indexOf($scope.parentState) == 0) && x.name.split('.').length == $scope.parentState.split('.').length + 1 && !x.hideInMenu) {
                        if (x.abstract) {
                            x.redirectState = $scope.findFirstChildState(x);
                        } else {
                            x.redirectState = x.name;
                        }
                        return true;
                    } else
                        return false;
                });

            }
            $scope.findFirstChildState = function (state) {

                var childState = $state.get().filter(function (y) {
                    if (y.name.indexOf(state.name + '.') == 0) {
                        return true;
                    } else {
                        return false;
                    }
                })[0];

                if (childState.abstract) {
                    return $scope.findFirstChildState(childState);
                } else {
                    return childState.name;
                }

            }



            $scope.filterStates();

            $scope.show = function () {
                return false;
            }

        }

        p.link = function ($scope, element, attributes, controller) {

            $scope.setMenuActive = function (pageLocation, abstract) {
                if (abstract) {
                    var page = $state.includes(pageLocation);
                } else {
                    var page = $state.is(pageLocation);
                }
                if (page) {
                    $state.get().filter(function (x) {
                        if (x.name == pageLocation) {
                            $scope.stateName = x.friendlyName;
                        }
                    });
                    return 'active';
                } else {
                    return '';
                }
            }



        }

        return p;
    }
]);