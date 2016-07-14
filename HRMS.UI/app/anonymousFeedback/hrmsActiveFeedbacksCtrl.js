hrBaseApp.controller('hrmsActiveFeedbacksCtrl', ['$scope', '$rootScope', 'feedbackFctry', 'commonCtrl', '$state', '$filter', 
    function ($scope, $rootScope, feedbackFctry, commonCtrl, $state, $filter) {
        'use strict';

        $scope.init = function () {
            $scope.getFeedbacks();
        }            
            $scope.getFeedbacks = function () {
                feedbackFctry.api.getFeedbacks( 
                function(response) {
                    if(response!=null)
                    {
                        $scope.feedbacks = response.data;
                        $scope.activeFeedbacks = $scope.feedbacks.filter(function(obj) {
                            return obj.Resolve.value=='0';
                        });
                        $scope.archivedFeedbacks = $scope.feedbacks.filter(function(obj) {
                            return obj.Resolve.value=='1';
                        });
                    }
                });
            };
            
            $scope.getFeedbackById = function (feedbackId) {
                $state.go('home.feedbackConversation', { feedbackId: feedbackId });
        }
            
        $scope.init();
    }]);