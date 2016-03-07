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
            .state('home', {
                url: '/',
                templateUrl: '/app/home/hrmsFrameCtrl.html',
                controller: 'hrmsFrameCtrl',
                abstract: true
            })


        .state('home.account', {
                url: '',
                templateUrl: '/app/authenticate/authCtrl.html',
                controller: 'authCtrl',
                friendlyName: 'Sign In',
                hideInMenu: true
            })
            .state('home.dashboard', {
                url: 'dashboard',
                templateUrl: '/app/home/hrmsMainCtrl.html',
                controller: 'hrmsMainCtrl',
                friendlyName: 'Dashboard'
            })
            .state('home.editProfile', {
                url: 'editProfile',
                templateUrl: '/app/home/hrmsEditProfileCtrl.html',
                controller: 'hrmsEditProfileCtrl',
                friendlyName: 'Edit Profile'
            })
            .state('home.approveProfile', {
                url: 'ApproveProfile',
                templateUrl: '/app/home/hrmsApproveProfileCtrl.html',
                controller: 'hrmsApproveProfileCtrl',
                friendlyName: 'Approve Profile'
            })
            .state('home.attendance', {
                url: 'attendance',
                templateUrl: '/app/leaves/hrmsAttendanceCtrl.html',
                controller: 'hrmsAttendanceCtrl',
                friendlyName: 'Attendance Tracker',
                abstract: true
            })
            .state('home.attendance.leaves', {
                url: 'leaves',
                templateUrl: '/app/leaves/hrmsLeavesCtrl.html',
                controller: 'hrmsLeavesCtrl',
                friendlyName: 'Leaves'
            })
            .state('home.attendance.compoffs', {
                url: 'compoffs',
                templateUrl: '/app/leaves/hrmsCompOffsCtrl.html',
                controller: 'hrmsCompOffsCtrl',
                friendlyName: 'Comp Off'
            })
            .state('home.admin', {
                url: 'admin',
                templateUrl: '/app/admin/attendanceCtrl.html',
                controller: 'attendanceCtrl',
                friendlyName: 'Attendance Upload'
            })

        /*.state('home.birthdays', {
            url: 'birthdays',
            templateUrl: '/app/dashboard/hrmsBirthdaysCtrl.html',
            controller: 'hrmsBirthdaysCtrl',
            friendlyName: 'Upcoming Birthdays'
        })
        .state('home.holidays', {
            url: 'holidays',
            templateUrl: '/app/dashboard/hrmsHolidaysCtrl.html',
            controller: 'hrmsHolidaysCtrl',
            friendlyName: 'Upcoming Holidays'
        })
        .state('home.anniversaries', {
            url: 'anniversaries',
            templateUrl: '/app/dashboard/hrmsAnniversaryCtrl.html',
            controller: 'hrmsAnniversaryCtrl',
            friendlyName: 'Upcoming Anniversaries'
        })*/
    }
]);