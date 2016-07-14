hrBaseApp.controller('hrmsFeedbackCtrl', ['$scope', '$rootScope', 'feedbackFctry', 'commonCtrl', '$state',
    function ($scope, $rootScope, feedbackFctry, commonCtrl, $state) {
        'use strict';

        $scope.init = function () {
            $scope.conversationUrlPrefix = 'http://localhost:55555/#/FeedbackConversation/';
            $scope.feedback = {};
            $scope.showErrorMsg = false;
        }

        $scope.getFeedbackById = function (feedbackId) {
            feedbackFctry.api.getFeedbacks({ feedbackId: feedbackId },
                function (response) {
                    if (response.data.length > 0) {
                        $state.go('home.feedbackConversation', { feedbackId: feedbackId });
                    }
                    else
                    {
                        $scope.showErrorMsg = true;
                    }
                });
        }

        $scope.trackFeedback = function (feedbackId) {
            if ($scope.trackFeedbackForm.$valid) {
                $scope.getFeedbackById(feedbackId);
            }
        }

        $scope.submitFeedback = function () {
            if ($scope.feedbackForm.$valid) {
                $scope.referenceFeedbackId = Math.random().toString().substr(2, 6);
                feedbackFctry.api.submitFeedback({ feedbackId: $scope.referenceFeedbackId, feedback: $scope.feedback },
                    function (response) {
                        if (response != null) {
                            commonCtrl.confirm("Feedback submitted", "Feedback successfully submitted. Mail has been sent to your email id. For further communication please use this Feedback ID:-" + $scope.referenceFeedbackId, $scope.init());
                            $scope.feedbackForm.$setPristine();
                        }
                    });
            }
        };

        $scope.init();
    }]);