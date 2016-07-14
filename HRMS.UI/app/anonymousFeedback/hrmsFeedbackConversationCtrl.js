hrBaseApp.controller('hrmsFeedbackConversationCtrl', ['$scope', '$rootScope', 'feedbackFctry', '$stateParams', 'commonCtrl', 'hrmsConstant', 'localStorageService',
    function ($scope, $rootScope, feedbackFctry, $stateParams, commonCtrl, hrmsConstant, localStorageService) {
        'use strict';

        $scope.init = function () {
            $scope.getFeedbackById();
            $scope.userEmail = $rootScope.userDetails.UserEmail.value;
            $scope.replyMsg = '';
            $scope.showError = false;
            console.log(localStorageService.get('userDetails'));
                                localStorageService.get('role');
        }


        $scope.getFeedbackById = function () {
            feedbackFctry.api.getFeedbacks({ feedbackId: $stateParams.feedbackId },
                function (response) {
                    if (response != null) {
                        $scope.feedbackDetails = response.data[0];
                        $scope.getConversationData();
                    }
                });
        }

        $scope.getConversationData = function () {
            feedbackFctry.api.getConversationData({ feedbackId: $stateParams.feedbackId },
                function (response) {
                    if (response != null) {
                        $scope.conversationDetails = response.data;
                    }
                });
        }

        $scope.submitReply = function () {
            //console.log(hrmsConstant);
            if ($scope.conversationForm.$valid) {
                feedbackFctry.api.insertConversationData({ feedbackId: $stateParams.feedbackId, comment: $scope.replyMsg, username: ($scope.userEmail == hrmsConstant.superAdminEmail ? hrmsConstant.superAdminName : 'Anonymous User') },
                    function (response) {
                        if (response != null) {
                            $scope.init();
                        }
                    });
            }
        }

        $scope.confirmResolve = function () {
            if ($scope.conversationForm.$valid) {
                commonCtrl.confirm("Resolve Feedback", "Are you sure you want to resolve this feedback?", $scope.submitReplyAndResolve(), 'md', false);
            }
            else
                $scope.showError = true;
        }

        $scope.confirmReopen = function () {
            if ($scope.conversationForm.$valid) {
                commonCtrl.confirm("Reopen Feedback", "Are you sure you want to reopen this feedback?", $scope.submitReplyAndReopen(), 'md', false);
            }
            else
                $scope.showError = true;
        }

        $scope.submitReplyAndResolve = function () {
            if ($scope.conversationForm.$valid) {
                $scope.submitReply();
                $scope.conversationForm.$setPristine();
                feedbackFctry.api.updateAnonymousFeedback({ feedbackId: $stateParams.feedbackId, resolve: '1' },
                    function (response) {
                        if (response != null) {
                            commonCtrl.confirm("Resolved", "Feedback has been resolved.", $scope.init());
                        }
                    });
            }
        };

        $scope.submitReplyAndReopen = function () {
            if ($scope.conversationForm.$valid) {
                $scope.submitReply();
                $scope.conversationForm.$setPristine();
                feedbackFctry.api.updateAnonymousFeedback({ feedbackId: $stateParams.feedbackId, resolve: '0' },
                    function (response) {
                        if (response != null) {
                            commonCtrl.confirm("Reopened", "Feedback has been reopened.", $scope.init());
                        }
                    });
            }
        };


        $scope.init();
    }]);