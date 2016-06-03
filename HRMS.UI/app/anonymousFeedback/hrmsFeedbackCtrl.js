hrBaseApp.controller('hrmsFeedbackCtrl', ['$scope', '$rootScope', 'feedbackFctry', 'commonCtrl', 
    function ($scope, $rootScope, feedbackFctry, commonCtrl) {
        'use strict';

        $scope.init = function () {
            $scope.feedback = {};
        }            
            $scope.submitFeedback = function () {
                $scope.referenceFeedbackId = Math.random().toString().substr(2,6);
                feedbackFctry.api.submitFeedback({feedbackId:$scope.referenceFeedbackId, feedback:$scope.feedback}, 
                function(response) {
                    if(response!=null)
                    {
                        commonCtrl.confirm("Feedback submitted", "Feedback successfully submitted. Mail has been sent to your email id. For further communication please use this Feedback ID:-"+ $scope.referenceFeedbackId, $scope.init() );           
                    }
                });
            };
            
        $scope.init();
    }]);