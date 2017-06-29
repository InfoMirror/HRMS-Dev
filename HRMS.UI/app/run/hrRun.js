hrBaseApp.run(['$rootScope', '$http', '$modal', '$state', '$window', 'localStorageService',
    function ($rootScope, $http, $modal, $state, $window, localStorageService) {
        //$rootScope.isModified = false;
        var isLoggedIn = localStorageService.get('isLoggedIn');
        if (isLoggedIn !== 'true') {
            $state.go('account');
        }
        $rootScope.$on("$stateChangeStart", function (event, next, current, fromState) {
            var currentRole = localStorageService.get('role');
            $rootScope.toState = next.name;
            $rootScope.error = null;
            if (next.name.includes('hr') && currentRole != 'HR') {
                event.preventDefault();
                $state.go('home.norights');
            }
        });
    }
])