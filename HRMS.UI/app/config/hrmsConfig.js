hrBaseApp.config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'localStorageServiceProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('hrmsApp')
            .setStorageType('sessionStorage')
            .setNotify(true, true)

        //$httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        //$httpProvider.defaults.headers.common.Pragma = "no-cache";

        //alert($rootScope.Role);
        //$locationProvider.html5Mode(true).hashPrefix('!');

        // $urlRouterProvider.otherwise("/404");

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', '');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/app/home/hrmsFrameCtrl.html',
                controller: 'hrmsFrameCtrl',
                abstract: true,
                roles: ['Employee', 'HR']
            })
            .state('account', {
                url: '/',
                templateUrl: '/app/authenticate/authCtrl.html',
                controller: 'authCtrl',
                friendlyName: 'Sign In',
                hideInMenu: true,
                roles: ['Employee', 'HR']
            })
            .state('home.dashboard', {
                url: 'dashboard',
                templateUrl: '/app/home/hrmsMainCtrl.html',
                controller: 'hrmsMainCtrl',
                friendlyName: 'Dashboard',
                roles: ['Employee', 'HR']
            })
            .state('home.editProfile', {
                url: 'editProfile',
                templateUrl: '/app/home/hrmsEditProfileCtrl.html',
                controller: 'hrmsEditProfileCtrl',
                friendlyName: 'Edit Profile',
                roles: ['Employee', 'HR'],
                hideInMenu: true
            })
            .state('home.hr', {
                url: 'hr',
                templateUrl: '/app/home/hrRoleCtrl.html',
                controller: 'hrRoleCtrl',
                friendlyName: 'HR Roles',
                abstract: true,
                roles: ['HR']
            })
            .state('home.hr.approveProfile', {
                url: '/ApproveProfile',
                templateUrl: '/app/home/hrmsApproveProfileCtrl.html',
                controller: 'hrmsApproveProfileCtrl',
                friendlyName: 'Approve Profile',
                roles: ['HR']
            })
            .state('home.hr.deactivateUser', {
                url: '/ApproveProfile',
                templateUrl: '/app/home/hrmsUserDeactivation.html',
                controller: 'hrmsUserDeactivation',
                friendlyName: 'Activate User',
                roles: ['HR']
            })
            .state('home.attendance', {
                url: 'attendance',
                templateUrl: '/app/leaves/hrmsAttendanceCtrl.html',
                controller: 'hrmsAttendanceCtrl',
                friendlyName: 'Attendance Tracker',
                abstract: true,
                roles: ['Employee', 'HR']
            })
            .state('home.attendance.leaves', {
                url: '/leaves',
                templateUrl: '/app/leaves/hrmsLeavesCtrl.html',
                controller: 'hrmsLeavesCtrl',
                friendlyName: 'Absents',
                roles: ['Employee', 'HR']
            })
            .state('home.attendance.compoffs', {
                url: '/compoffs',
                templateUrl: '/app/leaves/hrmsCompOffsCtrl.html',
                controller: 'hrmsCompOffsCtrl',
                friendlyName: 'Comp Off',
                roles: ['Employee', 'HR']
            })
            .state('home.attendance.applyleave', {
                url: '/ApplyLeave',
                templateUrl: '/app/leaves/applyleaveCtrl.html',
                controller: 'applyleaveCtrl',
                friendlyName: 'Apply Leave',
                roles: ['Employee', 'HR']
            })
            .state('home.attendance.leaveSummary', {
                url: '/leaveSummary',
                templateUrl: '/app/leaves/hrmsLeaveSummaryCtrl.html',
                controller: 'hrmsLeaveSummaryCtrl',
                friendlyName: 'Leave Summary',
                roles: ['Employee', 'HR']
            })
            .state('home.hr.admin', {
                url: '/admin',
                templateUrl: '/app/admin/attendanceCtrl.html',
                controller: 'attendanceCtrl',
                friendlyName: 'Daily Attendance Upload',
                roles: ['HR']
            })
            .state('home.hr.adminMonthly', {
                url: '/adminMontlyUpload',
                templateUrl: '/app/admin/attendanceMCtrl.html',
                controller: 'attendanceMCtrl',
                friendlyName: 'Monthly Attendance Upload',
                roles: ['HR']
            })
            .state('home.approval', {
                url: 'approval',
                templateUrl: '/app/approval/hrmsApprovalCtrl.html',
                controller: 'hrmsApprovalCtrl',
                friendlyName: 'Give Approval',
                abstract: true,
                roles: ['Employee', 'HR']
            })
            .state('home.approval.compOff', {
                url: '/CompOffsApproval',
                templateUrl: '/app/approval/hrmsApproveCompOffCtrl.html',
                controller: 'hrmsApproveCompOffCtrl',
                friendlyName: 'CompOff Approval',
                roles: ['Employee', 'HR']
            })
            .state('home.approval.od', {
                url: '/ODApproval',
                templateUrl: '/app/approval/hrmsApproveODCtrl.html',
                controller: 'hrmsApproveODCtrl',
                friendlyName: 'OD Approval',
                roles: ['Employee', 'HR']
            })
            .state('home.approval.leave', {
                url: '/LeaveApproval',
                templateUrl: '/app/approval/hrmsApproveLeaveCtrl.html',
                controller: 'hrmsApproveLeaveCtrl',
                friendlyName: 'Leave Approval',
                roles: ['Employee', 'HR']
            })
            .state('home.norights', {
                url: 'NoRights',
                templateUrl: '/app/home/hrmsNoRights.html',
                controller: 'hrmsNoRights',
                hideInMenu: true,
                roles: ['Employee', 'HR']
            })

    }
]);