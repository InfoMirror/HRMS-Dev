hrBaseApp.run(['$rootScope', '$http', '$modal', '$state', '$window',
    function ($rootScope, $http, $modal, $state, $window) {
        $rootScope.isModified = false;
        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $rootScope.toState = next;
            $rootScope.error = null;
            debugger;
            if (next.name.includes('hr') && $rootScope.Role != 'HR') {
                debugger;
                event.preventDefault();
               // $rootScope.isLoggedIn = false;
                $state.go('home.norights');
            }
            //console.log($rootScope.toState.name);
            /*if($rootScope.isLoggedIn){
              //  event.preventDefault();
                $state.go('home.dashboard');
            }else{
               // event.preventDefault();
                $state.go('home.account');
            }*/
        });
    }
])