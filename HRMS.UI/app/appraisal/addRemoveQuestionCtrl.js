hrBaseApp.controller('addRemoveQuestionCtrl', ['$scope', '$rootScope', '$modal', 'appraisalFctry', '$filter',
    function ($scope, $rootScope, $modal, appraisalFctry, $filter) {
        $scope.feedback = {};
        $scope.data = {
            singleSelect: [],
        };

        $scope.AddQuestion = function () {
            var skill = $scope.skillModel.toString();
            var description = $scope.descriptionModel;
            var weightage = $scope.weightageModel;
            var active = $scope.activeModel;
            var trainee = $scope.traineeModel;
            appraisalFctry.api.addAppraisalQuestion({
                quesDescription: description,
                questype: skill,
                isActive: active,
                isTrainee: trainee,
                weightage: weightage
            },
                function (response) {
                    if (response.data.length > 0) {
                        alert(response.data);
                    }
                    else {
                        $scope.showErrorMsg = true;
                    }

                });

        }

        $scope.RemoveQuestion = function () {
            $scope.opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                templateUrl: '/app/appraisal/RemoveQuestion.html',
                controller: 'RemoveQuestionsCtrl',
                size: 'lg',
                resolve: {}
            };
            var modalInstance = $modal.open($scope.opts);

        }


    }]);

