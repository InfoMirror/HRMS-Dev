hrBaseApp.config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'localStorageServiceProvider', 
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider, $localStorage, $sessionStorage) {
        localStorageServiceProvider
            .setPrefix('hrmsApp')
            .setStorageType('localStorage')
            .setNotify(true, true)

        //$httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        //$httpProvider.defaults.headers.common.Pragma = "no-cache";

        //alert($rootScope.Role);
        //$locationProvider.html5Mode(true).hashPrefix('!');
//console.log($localStorage.role);
        // $urlRouterProvider.otherwise("/404");

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', '');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/app/home/hrmsFrameCtrl.html',
                controller: 'hrmsFrameCtrl',
                abstract: true
            })
            .state('account', {
                url: '/',
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
            .state('home.hr', {
                url: 'hr',
                templateUrl: '/app/home/hrRoleCtrl.html',
                controller: 'hrRoleCtrl',
                friendlyName: 'HR Roles',
                abstract: true
            })
            .state('home.hr.approveProfile', {
                url: '/ApproveProfile',
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
                url: '/leaves',
                templateUrl: '/app/leaves/hrmsLeavesCtrl.html',
                controller: 'hrmsLeavesCtrl',
                friendlyName: 'Absents'
            })
            .state('home.attendance.compoffs', {
                url: '/compoffs',
                templateUrl: '/app/leaves/hrmsCompOffsCtrl.html',
                controller: 'hrmsCompOffsCtrl',
                friendlyName: 'Comp Off'
            })
            .state('home.attendance.applyleave', {
                url: '/ApplyLeave',
                templateUrl: '/app/leaves/applyleaveCtrl.html',
                controller: 'applyleaveCtrl',
                friendlyName: 'Apply Leave'
            })
            .state('home.attendance.leaveSummary', {
                url: '/leaveSummary',
                templateUrl: '/app/leaves/hrmsLeaveSummaryCtrl.html',
                controller: 'hrmsLeaveSummaryCtrl',
                friendlyName: 'Leave Summary'
            })
            .state('home.hr.admin', {
                url: '/admin',
                templateUrl: '/app/admin/attendanceCtrl.html',
                controller: 'attendanceCtrl',
                friendlyName: 'Daily Attendance Upload'
            })
            .state('home.hr.adminMonthly', {
                url: '/adminMontlyUpload',
                templateUrl: '/app/admin/attendanceMCtrl.html',
                controller: 'attendanceMCtrl',
                friendlyName: 'Monthly Attendance Upload'
            })
            .state('home.approval', {
                url: 'approval',
                templateUrl: '/app/approval/hrmsApprovalCtrl.html',
                controller: 'hrmsApprovalCtrl',
                friendlyName: 'Give Approval',
                abstract: true
            })
            .state('home.approval.compOff', {
                url: '/CompOffsApproval',
                templateUrl: '/app/approval/hrmsApproveCompOffCtrl.html',
                controller: 'hrmsApproveCompOffCtrl',
                friendlyName: 'CompOff Approval'
            })
            .state('home.approval.od', {
                url: '/ODApproval',
                templateUrl: '/app/approval/hrmsApproveODCtrl.html',
                controller: 'hrmsApproveODCtrl',
                friendlyName: 'OD Approval'
            })
            .state('home.approval.leave', {
                url: '/LeaveApproval',
                templateUrl: '/app/approval/hrmsApproveLeaveCtrl.html',
                controller: 'hrmsApproveLeaveCtrl',
                friendlyName: 'Leave Approval'
            })
            .state('home.norights', {
                url: 'NoRights',
                templateUrl: '/app/home/hrmsNoRights.html',
                controller: 'hrmsNoRights',
                hideInMenu: true
            })
            .state('home.anonymousFeedback', {
                url: 'AnonymousFeedback',
                templateUrl: '/app/anonymousFeedback/hrmsFeedback.html',
                controller: 'hrmsFeedbackCtrl',
                friendlyName: 'Anonymous Feedback'
            })
            .state('home.feedbackConversation', {
                url: 'FeedbackConversation/:feedbackId',
                templateUrl: '/app/anonymousFeedback/hrmsFeedbackConversation.html',
                controller: 'hrmsFeedbackConversationCtrl',
                friendlyName: 'Feedback Conversation',
                hideInMenu: true
            })
            .state('home.feedbacks', {
                url: 'feedbacks',
                templateUrl: '/app/anonymousFeedback/hrmsAllFeedbacks.html',
                controller: 'hrmsAllFeedbacksCtrl',
                friendlyName: 'Feedbacks',
                abstract: true,
                roles: ['SuperAdmin']
            })
            .state('home.feedbacks.activeFeedbacks', {
                url: '/activeFeedbacks',
                templateUrl: '/app/anonymousFeedback/hrmsActiveFeedbacks.html',
                controller: 'hrmsActiveFeedbacksCtrl',
                friendlyName: 'Active Feedbacks'
            })
            .state('home.feedbacks.archivedFeedbacks', {
                url: '/archivedFeedbacks',
                templateUrl: '/app/anonymousFeedback/hrmsArchivedFeedbacks.html',
                controller: 'hrmsActiveFeedbacksCtrl',
                friendlyName: 'Archived Feedbacks'
            })
    }
]);