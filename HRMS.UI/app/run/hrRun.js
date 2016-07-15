hrBaseApp.run(['$rootScope', '$http', '$modal', '$state', '$window', 'localStorageService',
    function ($rootScope, $http, $modal, $state, $window, localStorageService) {
        $rootScope.isModified = false;
        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $rootScope.toState = next;
            $rootScope.error = null;
            //console.log(next);
            if (next.name.includes('hr') && $rootScope.Role != 'HR') {
                event.preventDefault();
                $state.go('home.norights');
            }
        });
    }
])