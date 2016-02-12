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