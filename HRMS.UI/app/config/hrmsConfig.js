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
        .state('home.dashboard', { url: 'dashboard', templateUrl: '/app/home/hrmsMainCtrl.html', controller: 'hrmsMainCtrl' })
         .state('home.admin', { url: 'admin', templateUrl: '/app/admin/attendanceCtrl.html', controller: 'attendanceCtrl' })
    }
]);