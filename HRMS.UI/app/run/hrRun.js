hrBaseApp.run(['$rootScope', '$http', '$modal', '$state', '$window',
    function ($rootScope, $http, $modal, $state, $window) {
        $rootScope.isModified = false;
        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $rootScope.toState = next;
            $rootScope.error = null;
            if (next.name.includes('hr') && $rootScope.Role != 'HR') {
                event.preventDefault();
                $state.go('home.norights');
            }
        });
    }
])