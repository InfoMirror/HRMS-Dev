hrBaseApp.run(['$rootScope', '$http', '$modal', '$state', '$window',
    function ($rootScope, $http, $modal, $state, $window) {
        $rootScope.isModified = false;
        $rootScope.$on("$stateChangeStart", function (event, next, current, fromState) {
            $rootScope.toState = next.name;
            $rootScope.error = null;
            if (next.name.includes('hr') && $rootScope.Role != 'HR') {
                event.preventDefault();
                $state.go('home.norights');
            }

             if ($rootScope.toState == "account" && $rootScope.isLoggedIn == true) {    
                 event.preventDefault();            
                $state.go(fromState.name);
            }
        });
    }
])