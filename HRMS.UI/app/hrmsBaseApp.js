///#source 1 1 /app/app.js
'use strict';

var hrBaseApp = angular.module('hrBaseApp', ['ngResource', 'ui.router', 'ngRoute', 'LocalStorageModule', 'angular.chosen',
    'ngTouch', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav',
    'uiSwitch', 'ui.keypress', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'ui.bootstrap', 'ui.utils'])
.controller('hrBaseMainCtrl', ['$scope', function ($scope) {

}]);

// Bootstrap  to get environment variables beforehand
//fetchData().then(bootstrapApplication);
//function fetchData() {
//    var initInjector = angular.injector(["ng"]);
//    var $http = initInjector.get("$http");
//    return $http.get("/app/appConstant.json").then(function (response) {
//        hrmsSettingsVal.apiUrl = response.data.apiUrl;
//        hrBaseApp.value('hrmsSettingsVal', hrmsSettingsVal);
//    }, function (errorResponse) {
//        // Handle error case
//    });
//}
//function bootstrapApplication() {
//    angular.element(document).ready(function () {
//        angular.bootstrap(document, ["hrBaseApp"]);
//    });
//}
///#source 1 1 /app/values/hrmsSettingsVal.js
var hrmsSettingsVal = {
    jsonUrl: '/app/appConstant.json'
};
///#source 1 1 /app/config/routing-config.js
(function (exports) {

    var config = {
        /* List all the roles you wish to use in the app
        * You have a max of 31 before the bit shift pushes the accompanying integer out of
        * the memory footprint for an integer
        */
        roles: [
          'public',
          'auth',
          'user',
          'admin',
        'devuser'],

        /*
        Build out all the access levels you want referencing the roles listed above
        You can use the "*" symbol to represent access to all roles
         */
        accessLevels: {
            'public': "*",
            'anon': ['public'],
            'user': ['user', 'devuser'],
            'dev': ['devuser'],
            'admin': ['admin'],
            'auth': ['auth', 'user', 'admin', 'devuser']
        }
    };

    exports.userRoles = buildRoles(config.roles);
    exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

    /*
        Method to build a distinct bit mask for each role
        It starts off with "1" and shifts the bit to the left for each element in the
        roles array parameter
     */

    function buildRoles(roles) {

        var bitMask = "01";
        var userRoles = {};

        for (var role in roles) {
            var intCode = parseInt(bitMask, 2);
            userRoles[roles[role]] = {
                bitMask: intCode,
                title: roles[role]
            };
            bitMask = (intCode << 1).toString(2);
        }

        return userRoles;
    }

    /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
     */
    function buildAccessLevels(accessLevelDeclarations, userRoles) {

        var accessLevels = {};
        for (var level in accessLevelDeclarations) {

            if (typeof accessLevelDeclarations[level] == 'string') {
                if (accessLevelDeclarations[level] == '*') {

                    var resultBitMask = '';

                    for (var role in userRoles) {
                        resultBitMask += "1";
                    }
                    //accessLevels[level] = parseInt(resultBitMask, 2);
                    accessLevels[level] = {
                        bitMask: parseInt(resultBitMask, 2),
                        title: accessLevelDeclarations[level]
                    };
                } else {
                    if (window.console) {
                        console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");
                    }
                }

            }
            else {

                var resultBitMask = 0;
                for (var role in accessLevelDeclarations[level]) {
                    if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role]))
                        resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
                    else {
                        if (window.console) {
                            console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
                        }
                    }
                }
                accessLevels[level] = {
                    bitMask: resultBitMask,
                    title: accessLevelDeclarations[level][role]
                };
            }
        }

        return accessLevels;
    }

})(typeof exports === 'undefined' ? this['routingConfig'] = {} : exports);
///#source 1 1 /app/config/hrmsConfig.js
hrBaseApp.config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'localStorageServiceProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
        localStorageServiceProvider
        .setPrefix('hrmsApp')
        .setStorageType('sessionStorage')
        .setNotify(true, true)

        //$httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        //$httpProvider.defaults.headers.common.Pragma = "no-cache";

        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/404");

        $urlRouterProvider.when('', '');
        $urlRouterProvider.when('/', '');

        $stateProvider
        .state('home', { url: '/', templateUrl: '/app/home/hrmsFrameCtrl.html', controller: 'hrmsFrameCtrl', abstract: true })
        .state('home.account', { url: '', templateUrl: '/app/authenticate/authCtrl.html', controller: 'authCtrl' })
    }
]);
///#source 1 1 /app/factory/authFctry.js
hrBaseApp.factory('authFctry', ['$http', '$resource', '$q', function ($http, $resource, $q) {
    var authDataFctry = {};
    var resource = $resource("http://localhost:9095" + '/account/:action', {
        action: '@action',
    },
    {
        'login': { method: 'POST', params: { action: 'login' }, isArray: false }
    }
    );
    var _login = function (parms) {
        var deferred = $q.defer();
        resource.login(parms,
            function (response) {
                deferred.resolve(response);
            },
          function (response) {
              deferred.reject(response);
          });

        return deferred.promise;
    }

    authDataFctry.login = _login;
    return authDataFctry;
}]);
///#source 1 1 /app/run/hrRun.js
hrBaseApp.run(['$rootScope', '$http', '$modal', '$state', '$window',
    function ($rootScope, $http, $modal, $state, $window) {
        $rootScope.isModified = false;
        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $rootScope.toState = next;
            $rootScope.error = null;
            console.log($rootScope.toState.name);
        });
        //var GotoNext = function () {
        //    if ('home.logout' === $rootScope.toState.name)
        //        $window.open('', '_parent', '').close();
        //    if ('home.scheduler.new' === $rootScope.toState.name)
        //        $rootScope.IsNewCoupon = true;
        //    $rootScope.isModified = false;
        //    return $state.go($rootScope.toState.name);
        //};
        //App.baseUi.initToastr();
    }
])
///#source 1 1 /app/shared/hr-header-drctv.js
hrBaseApp.directive('hrHeaderDrctv', [
    '$state', '$log',
    function ($state, $log) {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-header-drctv.html';

        //p.link = function ($scope, element, attributes, controller) {
        //    App.baseUi.basics();
        //    App.baseUi.handleScrollbars();
        //    App.baseUi.navbarHelpers();
        //    App.baseUi.scrollTopBtn();

        //    //#region=== Private Scope Methods ===


        //    //#endregion
        //}

        return p;
    }
])
///#source 1 1 /app/shared/hr-sidemenu-drctv.js
hrBaseApp.directive('hrSidemenuDrctv', [
    function () {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-sidemenu-drctv.html';

        p.link = function ($scope, $state, element, attributes, controller) {
            (function () {
                try {
                    ace.settings.check('sidebar', 'fixed');
                } catch (e) {

                }

                try {
                    ace.settings.check('sidebar', 'collapsed');
                } catch (e) { }

                //App.baseUi.enableSidebar();
                //App.baseUi.sidebarTooltips();

            })();

            //$scope.setMenuVisibility = function (pageLocation) {
            //    // return seAuthFactory.authorize($state.get(pageLocation).access);
            //}

            //$scope.setMenuActive = function (pageLocation) {
            //    var page = $state.is(pageLocation);
            //    if (page) {
            //        return 'active';
            //    } else {
            //        return '';
            //    }
            //}

            //$scope.setMenuHeaderActive = function (sectionLocation) {

            //    var page = $state.includes(sectionLocation);
            //    if (page) {
            //        return 'active open';
            //    } else {
            //        return '';
            //    }
            //}

            //$scope.setMenuHeaderInactive = function (sectionLocation) {

            //    var page = $state.includes(sectionLocation);
            //    if (page) {
            //        return 'nav-hide';
            //    } else {
            //        return '';
            //    }
            //}

            //$scope.setMenuHeaderInactiveStyle = function (sectionLocation) {

            //    var page = $state.includes(sectionLocation);
            //    if (page) {
            //        return '';
            //    } else {
            //        return { 'display': 'none' };
            //    }
            //}

            $("#sidebar").click(function () {
                var btn = $("#menu-toggler");
                var sidebar = $(btn.attr('data-target'));
                if (sidebar.length == 0) return;

                if (btn.hasClass('display')) {
                    sidebar.toggleClass('display');
                    btn.toggleClass('display');
                }
            });
        }




        return p;
    }
])
///#source 1 1 /app/shared/hr-footer-drctv.js
hrBaseApp.directive('hrFooterDrctv', [
    function () {
        'use strict';

        var p = {};

        p.transclude = true;
        p.replace = true;
        p.restrict = 'E';
        p.templateUrl = '/app/shared/hr-footer-drctv.html';

        p.link = function ($scope, element, attributes, controller) {
            $scope.currentYear = moment().format('YYYY');
        }

        return p;
    }
])
///#source 1 1 /app/home/hrmsFrameCtrl.js
hrBaseApp.controller('hrmsFrameCtrl', [
  '$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {
      'use strict';
      //alert('Hello, I am in Frame Controller');
      //$rootScope.User = $stateParams.User;
      //$rootScope.OEM = $stateParams.oemName;
      //console.log($rootScope.User);
  }
]);
///#source 1 1 /app/home/hrmsMainCtrl.js
hrBaseApp.controller('hrmsMainCtrl', [
  '$scope', function ($scope, $rootScope, $window) {
      'use strict';
      //  $rootScope.mywindow = $window;
      alert('Hello, I am in HRMS Main Controller');
      //#region === Initialize ===

      //#endregion

  }
]);
///#source 1 1 /app/authenticate/authCtrl.js
var authCtrl = hrBaseApp.controller('authCtrl', ['authFctry', '$scope', function (authFctry, $scope) {

    // #region Initialize
    alert('Hello, I am in authCtrl');
    $scope.init = function () {
        $scope.userDetails = { "email": "surbhi@infoobjects.com", "userName": "SurbhiHarsh" };
        $scope.setUserDetails();
        //$scope.login($scope.userDetails);
      //  alert(JSON.stringify($scope.userDetails));
       // alert($scope.userDetails.email);
    }

    //$scope.login = function (userDetails) {
    //    authFctry.login(userDetails);
    //}

    $scope.setUserDetails = function () {
        var params = {
            email: $scope.userDetails.email,
            userName: $scope.userDetails.userName
        };
        console.log(params);
        authFctry.login(params).then(function (response) {
            console.log(response);
            $scope.userDetails = {
                email: response.data[0].UserEmail,
                team: response.data[0].Team,
                skypeId: response.data[0].SkypeID,
                name: response.data[0].FirstName + response.data[0].LastName
            }
        },
        function (error) {
            console.log(error);
        });
    };

    $scope.init();
}]);
