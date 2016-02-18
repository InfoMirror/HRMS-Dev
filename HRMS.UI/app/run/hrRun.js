hrBaseApp.run(['$rootScope', '$http', '$modal', '$state', '$window',
    function ($rootScope, $http, $modal, $state, $window) {
        $rootScope.isModified = false;
        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $rootScope.toState = next;
            $rootScope.error = null;
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