hrBaseApp.controller('hrmsFeedbackCtrl', ['$scope', '$rootScope', 'feedbackFctry',
    function ($scope, $rootScope, feedbackFctry) {
        'use strict';

        $scope.init = function () {
            $scope.composeEmail = {
                to: 'mahendra@infoobjects.com',
                subject: 'Test Email',
                text: 'Test Body'
            };
        }
            $scope.sendEmail = function () {
                var param = $scope.composeEmail;
                feedbackFctry.sendEmail(param).then(function (response) {

                });
            };
            
        $scope.init();
    }]);